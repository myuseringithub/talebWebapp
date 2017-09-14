// Modules
import path from 'path'
import filesystem from 'fs'
import views from 'koa-views'
import rethinkDB from 'rethinkdb' 
import WebSocketModule from 'ws'
import bodyParser from 'koa-bodyparser'
import OAuth2Server from 'oauth2-server'

// Classes
import { default as Application } from 'appscript'
const ConditionController = require('appscript/module/condition')
const MiddlewareController = require('appscript/module/middleware')
// TODO: + initialize options for callback as functionMiddleware or document template rendering.

import WebappUIClass from 'port/webappUI/WebappUI.class.js'
import StaticContentClass from 'port/staticContent/StaticContent.class.js'
import ApiClass from 'port/api/Api.class.js'
import WebSocketClass from 'port/webSocket/WebSocket.class.js'

// Middlewares
// import route from 'port/api/middleware/route/route.js' // Routes & API
import implementMiddlewareOnModuleUsingJson from 'appscript/utilityFunction/middleware/implementMiddlewareOnModuleUsingJson.js' // Middleware extending server functionality
import createClassInstancePerRequest from 'appscript/utilityFunction/middleware/createClassInstancePerRequest.middleware.js'
import implementConditionActionOnModuleUsingJson from 'appscript/utilityFunction/middleware/implementConditionActionOnModuleUsingJson.js'
import RestApi from 'port/api/middleware/database/restEndpointApi.js'
let restEndpointApi = new RestApi('api/v1')

// TODO: Custom Dataset Schema/structure/blueprint, data document, csustom dataset type, custom fields, custom content type.
// TODO: Condition Tree:
// • Ability to decide insertion position of unit in subtree. e.g. before, after, first, last.
// • Check non immediate children for each insertion point to insert them in their correct destination.
// • Define unique key for each child, to allow insertion into other inserted children. i.e. extending existing trees with other trees and children. 

/**
 * initialize oAuth2 server
 */
let oAuth2Server;
let getTableDocument = {
    generate: require('appscript/utilityFunction/database/query/getTableDocumentAndFilter.query.js'),
    instance: []
}
getTableDocument.instance['oAuth_token'] = getTableDocument.generate('oAuth_token')
getTableDocument.instance['oAuth_client'] = getTableDocument.generate('oAuth_client')
getTableDocument.instance['oAuth_user'] = getTableDocument.generate('oAuth_user')
Application.eventEmitter.on('initializationEnd', () => { 
    oAuth2Server = new OAuth2Server({
        debug: true,
        // clientIdRegex: '^[A-Za-z0-9-_\^]{5,30}$', // client id should be compliant with the regex.
        // accessTokenLifetime: 60 * 60 * 24, // set the access token to last for 24 hours
        model: {
            
            /**
             * Not implemented, using default instead.
             */
            generateAccessToken: undefined, 
            generateRefreshToken: undefined,
            generateAuthorizationCode: undefined,
            getUser: undefined,
            getUserFromClient: undefined,

            
            /**
             * Invoked to retrieve an existing access token previously saved through Model#saveToken().
             * @param {String} accessToken - The access token to retrieve.
             * @return {Object} token - An Object representing the access token and associated data. Containing at least the following information:
             *         {String} .accessToken - the access token string
             *         {Date}   .accessTokenExpiresAt - the exact time when the access token should expire
             *         {String} .scope - access scope of this access token
             *         {Object} .client - the oauth client
             *         {String} .client.id - string id of the oauth client
             *         {Object} .user - the user which this access token represents, this data structure of the user object is not part of the Model Specification, and what it should be is completely up to you. In this example, we use { username: 'someUserName' } where the 'username' field is used to uniquely identify an user in the user database.
             */
            getAccessToken: async (accessToken) => {
                const connection = Application.rethinkdbConnection
                let tokenData = await getTableDocument.instance['oAuth_token'](connection, { accessToken: accessToken })
                if(!tokenData) return null
                let client = await getTableDocument.instance['oAuth_client'](connection, { clientId: tokenData.clientId })
                let user = await getTableDocument.instance['oAuth_user'](connection, { key: tokenData.userId })
                
                // return in required format.
                client.id = client.clientId // required format for oAuthServer.
                return { 
                    accessToken: tokenData.accessToken,
                    accessTokenExpiresAt: tokenData.accessTokenExpiresAt,
                    scope: tokenData.scope,
                    client: client, // with 'id' property
                    user: user            
                }
            },

            /**
             * the node-oauth2-server use this method to get detail information of a refresh token previously stored used OauthModel.prototype.saveToken.
             * <b>Note:</b>refresh token is used by the oauth client to request for a new access token, and it's actually not related to any access token in any way, so access tokens and refresh tokens should be stored and retrieved independent to each other.
             * @param {String} refreshToken - the refresh token string
             * @return {Object} token - the token object containing (at least) the following infomation, or null if the refresh token doesn't exist:
             *        {String} token.refreshToken - the refresh token string
             *        {Date} token.refreshTokenExpiresAt - the exact time when the refresh token should expire
             *        {String} scope - the access scope
             *        {Object} client - the client object
             *        {String} client.id - the id of the client
             *        {Object} user - the user object
             *        {String} user.username - identifier of the user
             */
            getRefreshToken: async (refreshToken) => {
                const connection = Application.rethinkdbConnection
                let tokenData = await getTableDocument.instance['oAuth_token'](connection, { refreshToken: refreshToken })
                if(!tokenData) return null
                let client = await getTableDocument.instance['oAuth_client'](connection, { clientId: tokenData.clientId })
                let user = await getTableDocument.instance['oAuth_user'](connection, { key: tokenData.userId })
                
                // return in required format.
                client.id = client.clientId // required format for oAuthServer.
                return { 
                    refreshToken: tokenData.refreshToken,
                    refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt,
                    scope: tokenData.scope,
                    client: client, // with 'id' property
                    user: user            
                }
            },

            /**
             * the node-oauth2-server use this method to get detail information of a authorization code previously stored used OauthModel.prototype.saveAuthorizationCode.
             * @param {String} authorizationCode - the authorization code string
             * @return {Object} code - the code object containing the following information, or null if the authorization code doesn't exist
             *         {String} code - the authorization code string
             *         {Date} expiresAt - the exact time when the code should expire
             *         {String} redirectUri - the redirect_uri query parameter of the '/oauth/authorize' request, indicating where to redirect to with the code
             *         {String} scope - the authorization scope deciding the access scope of the access token requested by the oauth client using this code
             *         {Object} client - the client object
             *         {String} client.id - the client id
             *         {Object} user - the user object
             *         {String} user.username - the user identifier
             */
            getAuthorizationCode: async (authorizationCode) => {
                const connection = Application.rethinkdbConnection
                let tokenData = await getTableDocument.instance['oAuth_token'](connection, { authorizationCode: authorizationCode })
                if(!tokenData) return null
                let client = await getTableDocument.instance['oAuth_client'](connection, { clientId: tokenData.clientId })
                let user = await getTableDocument.instance['oAuth_user'](connection, { key: tokenData.userId })
                
                // return in required format.
                client.id = client.clientId // required format for oAuthServer.
                return { 
                    code: tokenData.authorizationCode,
                    expiresAt: tokenData.authorizationCodeExpiresAt,
                    redirectUri: tokenData.redirectUri,
                    scope: tokenData.scope,
                    client: client, // with 'id' property
                    user: user            
                }
            },

            /**
             * the node-oauth2-server use this method to get detail infomation of a registered client.
             * @param {String} clientId - the client id
             * @param {String} [clientSecret] - the client secret, used in the token granting phase to authenticate the oauth client
             * @return {Object} client - the client object, containing (at least) the following infomation, or null if the client is not a valid registered client or the client secret doesn't match the clientId:
             *         {String} client.id - the client id
             *         {Array<String>} grants - an array of grant types allowed for this client, allowed values are: authorization_code | client_credentials | password | refresh_token
             *         {Array<String>} redirectUris - an array of urls (of the client) that allowed for redirecting to by the oauth server
             *         {Number} [accessTokenLifetime=3600] - define the lifetime of an access token in seconds, default is 1 hour
             *         {Number} [refreshTokenLifetime=3600 * 24 * 14] - define the lifetime of an refresh token in seconds, default is 2 weeks
             */
            getClient: async (clientId, clientSecret) => {
                const connection = Application.rethinkdbConnection
                let dbFilterObject = (clientSecret) ? {clientId, clientSecret} : {clientId};
                let client = await getTableDocument.instance['oAuth_client'](connection, dbFilterObject)
                if(!client) return null;
                
                // return in required format.
                return { 
                    id: client.clientId,
                    redirectUris: [client.redirectUri],
                    grants: client.grantType,
                    accessTokenLifetime: '',
                    refreshTokenLifetime: ''
                }
            },
             
            /**
             * the node-oauth2-server uses this method to save an access token and an refresh token(if refresh token enabled) during the token granting phase.
             * @param {Object} token - the token object
             * @param {String} token.accessToken - the access token string
             * @param {Date} token.accessTokenExpiresAt - @see OauthModel.prototype.getAccessToken
             * @param {String} token.refreshToken - the refresh token string
             * @param {Date} token.refreshTokenExpiresAt - @see OauthModel.prototype.getRefreshToken
             * @param {String} token.scope - the access scope
             * @param {Object} client - the client object - @see OauthModel.prototype.getClient
             *        {String} client.id - the client id
             * @param {Object} user - the user object @see OauthModel.prototype.getAccessToken
             * @param {String} user.id - the user identifier
             * @return {Object} token - the token object saved, same as the parameter 'token'
             */
            saveToken: async (token, client, user) => {
                // set expiration / TTL - https://groups.google.com/forum/#!topic/rethinkdb/tFSiG5Ex1KE for rethinkdb underdevelopment.
                
                const connection = Application.rethinkdbConnection                

                await rethinkDB.db('webappSetting').table('oAuth_token').insert({
                    accessToken: token.accessToken,
                    accessTokenExpiresAt: token.accessTokenExpiresAt,
                    scope: token.scope,
                    clientId: client.id,
                    userId: user.id
                }).run(connection)

                if(token.refreshToken){
                    await rethinkDB.db('webappSetting').table('oAuth_token').insert({
                        refreshToken: token.refreshToken,
                        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                        scope: token.scope,
                        clientId: client.id,
                        userId: user.id
                    }).run(connection)
                }

                return {
                    accessToken: token.accessToken,
                    accessTokenExpiresAt: token.accessTokenExpiresAt,
                    refreshToken: token.refreshToken,
                    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                    scope: token.scope,
                    client: {id: client.id},
                    user: {id: user.id}
                }            
            },
                
            /**
             * the node-oauth2-server uses this method to save an authorization code.
             * @param {Object} code - the authorization code object
             * @param {String} code.authorizationCode - the authorization code string
             * @param {Date} code.expiresAt - the time when the code should expire
             * @param {String} code.redirectUri - where to redirect to with the code
             * @param {String} [code.scope] - the authorized access scope
             * @param {Object} client - the client object
             * @param {String} client.id - the client id
             * @param {Object} user - the user object
             * @param {String} user.username - the user identifier
             * @return {Object} code - the code object saved
             */
            saveAuthorizationCode: async (code, client, user) => {
                const connection = Application.rethinkdbConnection                
                                
                await rethinkDB.db('webappSetting').table('oAuth_token').insert({
                    authorizationCode: code.authorizationCode,
                    authorizationCodeExpiresAt: code.expiresAt,
                    redirectUri: code.redirectUri,
                    scope: code.scope,
                    clientId: client.id,
                    userId: user.id
                }).run(connection)

                return {
                    authorizationCode: code.authorizationCode,
                    expiresAt: code.expiresAt,
                    redirectUri: code.redirectUri,
                    scope: code.scope,
                    client: {id: client.id},
                    user: {id: user.id}
                }
            },

            /**
             * the node-oauth2-server uses this method to revoke a refresh token(remove it from the store).
             * Note: by default, the node-oauth2-server enable the option 'alwaysIssueNewRefreshToken', meaning that every time you use a refresh token to get a new access token, the refresh token itself will be revoked and a new one will be issued along with the access token (you can set the option through OAuth2Server.token(request, response, [options], [callback]) or KoaOAuthServer.token(options)).
             * If you always use the refresh token before it expires, then there will always be a valid refresh token in the store(unless you explictly revoke it). This makes it seem like refresh token never expires.
             * @param {Object} token - the token object
             * @param {String} token.refreshToken - the refresh token string
             * @param {Date} token.refreshTokenExpiresAt - the exact time when the refresh token should expire
             * @param {String} token.scope - the access scope
             * @param {Object} token.client - the client object
             * @param {String} token.client.id - the client id
             * @param {Object} token.user - the user object
             * @param {String} token.user.username - the user identifier
             * @return {Boolean} - true if the token was successfully revoked, false if the token cound not be found
             */
            revokeToken: async (token) => {
                const connection = Application.rethinkdbConnection                
                let filterObject = { refreshToken: token.refreshToken }
                let {deleted: deletionResult} = await rethinkDB.db('webappSetting').table('oAuth_token').filter(filterObject).delete().run(connection)
                return (deletionResult) ? true : false;
            },

            /**
             * the node-oauth2-server uses this method to revoke a authorization code(mostly when it expires)
             * @param {Object} code - the authorization code object
             * @param {String} authorizationCode - the authorization code string
             * @param {Date} code.expiresAt -the time when the code should expire
             * @param {String} code.redirectUri - the redirect uri
             * @param {String} code.scope - the authorization scope
             * @param {Object} code.client - the client object
             * @param {String} code.client.id - the client id
             * @param {Object}  code.user - the user object
             * @param {String} code.user.username - the user identifier
             * @return {Boolean} - true if the code is revoked successfully,false if the could not be found
             */
            revokeAuthorizationCode: async (code) => {
                const connection = Application.rethinkdbConnection
                let filterObject = { authorizationCode: code.authorizationCode }
                let {deleted: deletionResult} = await rethinkDB.db('webappSetting').table('oAuth_token').filter(filterObject).delete().run(connection)
                return (deletionResult) ? true : false;
            },

            /**
             * the node-oauth2-server uses this method to determine what scopes should be granted to the client for accessing the user's data.
             * for example, the client requests the oauth server for an access token of the 'user_info:read,user_info_write' scope, 
             * but the oauth server determine by this method that only the 'user_info:read' scope should be granted.
             * @param {Object} user - the user whose data the client wants to access
             * @param {String} user.username - the user identifier
             * @param {Object} client - the oauth client
             * @param {String} client.id - the client id
             * @param {String} scope - the scopes which the client requested for
             * @return {String} validScopes - the actual valid scopes for the client, null if no valid scopes for the client
             */
            validateScope: async (user, client, scope) => {
                if(!scope) return null
                const connection = Application.rethinkdbConnection
                let dbFilterObject = { clientId: client.id }
                client = await getTableDocument.instance['oAuth_client'](connection, dbFilterObject)
                if(!client || !client.scope) return null
                let validScopes = client.scope.split(',').map(s => s.trim())
                let scopes = scope.split(',').map(s => s.trim()).filter(s => validScopes.indexOf(s) >= 0)
                return (scope.length) ? scopes.join(',') : null;                
            },

            /**
             * node-oauth2-server uses this method in authentication handler to verify whether an access token from a request is sufficient to the 'scope' declared for the requested resources
             * @param {Object} accessToken - the accessToken object
             * @param {String} accessToken.accessToken - the accessToken string
             * @param {Date} accessToken.accessTokenExpiresAt - the time when the token should expire
             * @param {String} accessToken.scope - the granted access scope of the token
             * @param {Object} accessToken.client - the client object
             * @param {String} accessToken.client.id - the client id
             * @param {Object} accessTokne.user - the user object
             * @param {String} accessToken.user.username - the user identifier
             * @param {String} scope - the scope declared for the resources
             * @return {Boolean} - true if the access token has sufficient access scopes for the resources
             */
            verifyScope: async (accessToken, scope) => {
                //no scope declared for the resource, free to access
                if(!scope) return true     
                if(!accessToken.scope) return false
                validScopes = scope.split(',').map(s => s.trim())
                scopes = accessToken.scope.split(',').map(s => s.trim())
                //check if at least one of the scopes granted to the access token are allowed to access the resource
                return scopes.some(s => validScopes.indexOf(s) >= 0)            
            },

            getUser: async () => {
                await somethingAsync();
                return 'works!';
            }
            
        }, // See https://github.com/oauthjs/node-oauth2-server for specification
    })
})

// ████████████████████████████████████████████████████████████████████████████████████████████████
/**
 * initialize database contents
 */ 
Application.eventEmitter.on('initializationEnd', () => {
    const connection = Application.rethinkdbConnection
    async function createDatabase(databaseName) {
        let databaseExists = await rethinkDB.dbList().contains(databaseName).run(connection);
        if(!databaseExists) {
            let dbCreationResponse = await rethinkDB.dbCreate(databaseName).run(connection)
            if(dbCreationResponse.dbs_created > 0)  console.log(`📢 ${databaseName} database created !`)
        } else {
            console.log(`📢📁 ${databaseName} database already exists !`)            
        }
    }

    function createTableAndInsertData(databaseName, databaseData) {
        for (let tableData of databaseData) {
            rethinkDB.db(databaseName).tableCreate(tableData.databaseTableName).run(connection)
                .then(tableCreationResponse => {
                    if(tableCreationResponse.tables_created > 0) console.log(`📢 ${tableData.databaseTableName} table created.`)
                    rethinkDB.db(databaseName).table(tableData.databaseTableName).insert(tableData.data).run(connection)
                        .then(response => {
                            console.log(`📢📥 ${response.inserted} documents inserted to ${tableData.databaseTableName}.`)
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(`📢 ${tableData.databaseTableName} table already exists.`))
        }
    }

    let databaseData = require('databaseDefaultData/databaseData.js')
    
    createDatabase('webappSetting')
        .then(() => {
            createTableAndInsertData('webappSetting', databaseData.webappSetting)
        })

    createDatabase('webappContent')
        .then(() => {
            createTableAndInsertData('webappContent', databaseData.webappContent)            
        })

    // .do(function(databaseExists) {
    //   return rethinkDB.branch(
    //     databaseExists,
    //     { dbs_created: 0 },
    //     rethinkDB.dbCreate('webapp')
    //   );
    // })
})

async function debugLogMiddleNestedUnitStructure(nestedUnitKeyMiddleware) {
    const connection = Application.rethinkdbConnection            
    let counter = 1
    async function getMiddlewareAndNestedMiddleware(key) {
        let getTableDocument = {
            generate: require('appscript/utilityFunction/database/query/getTableDocumentAndFilter.query.js'),
            instance: []
        }
        getTableDocument.instance['middleware_middlewareNestedUnit'] = getTableDocument.generate('middleware_middlewareNestedUnit')
        let middleware  = await getTableDocument.instance['middleware_middlewareNestedUnit'](connection, { key: key })
        
        let string = ''.concat(middleware.label.name, ' (', middleware.key, ') ')
        for (let child of middleware.children) {
            let childString = await getMiddlewareAndNestedMiddleware(child.nestedUnit)
            // let tabString = '\t'.repeat(counter)
            string = await string.concat('\n', ' → ', childString)
        }
        counter++
        return string
    }
    console.log(await getMiddlewareAndNestedMiddleware(nestedUnitKeyMiddleware))
}

process.env.SZN_DEBUG = true // show/hide console messages.

Application.eventEmitter.on('initializationEnd', async () => {
    let Class = WebappUIClass
    // Templating engine & associated extention.
    let MiddlewareControllerCachedInstance = await MiddlewareController(Application)
    let ConditionControllerCachedInstance = await ConditionController(Application)
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        bodyParser(),
        async (context, next) => {
            // await context.req.setTimeout(0);            
            // instance.middlewareArray.push(middleware)
            context.set('connection', 'keep-alive')
            await next()
        },
        async (context, next) => { // add middleware sequence for fast testing.
            // debugLogMiddleNestedUnitStructure('91140de5-9ab6-43cd-91fd-9eae5843c74c') 
            let middlewareSequence = [
                    // {
                    //     name: 'applyConditionCallback',
                    //     entrypointConditionTreeKey: 'default',
                    //     functionPath: ''
                    // }
            ]
            await implementMiddlewareOnModuleUsingJson(middlewareSequence)
            await next()
        },            
        async (context, next) => { // MIDDLEWARE
            let middlewareArray;
            let middlewareController = await new MiddlewareControllerCachedInstance(false, { portAppInstance: context.instance })
            middlewareArray = await middlewareController.initializeNestedUnit({ nestedUnitKey: '43d6e114-54b4-47d8-aa68-a2ae97b961d5' })
            await implementMiddlewareOnModuleUsingJson(middlewareArray)(context, next)
        },
        async (context, next) => { // CONDITION
            let self = Class
            // [1] Create instances and check conditions. Get callback either a function or document
            // The instance responsible for rquests of specific port.
            let conditionController = await new ConditionControllerCachedInstance(false, { portAppInstance: context.instance})
            let entrypointConditionTree = self.entrypointSetting.defaultConditionTreeKey
            if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🍊 Entrypoint Condition Key: ${entrypointConditionTree} \n \n`)
            let callback = await conditionController.initializeConditionTree({nestedUnitKey: entrypointConditionTree})
            // if(process.env.SZN_DEBUG == 'true') console.log(`🍊 Callback object: ${callback.name}`)
            // [2] Use callback
            if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🔀✔️ Choosen callback is: %c ${callback.name}`, self.config.style.green)
            await implementConditionActionOnModuleUsingJson({setting: callback})(context, next)
        }, 
        async (context, next) => {
            console.log('Last Middleware reached.')
            await next()
        }, 
    ])
    Class.createHttpServer()
})

// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.eventEmitter.on('initializationEnd', async () => {
    let Class = StaticContentClass
    // Templating engine & associated extention.
    let MiddlewareControllerCachedInstance = await MiddlewareController(Application)
    let ConditionControllerCachedInstance = await ConditionController(Application)
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        bodyParser(),        
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            // await context.req.setTimeout(0); // changes default Nodejs timeout (default 120 seconds).          
            await context.set('Access-Control-Allow-Origin', '*')
            await context.set('connection', 'keep-alive')
            await next()
        },
        async (context, next) => {
            // let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
            // await wait(500)
            let middlewareController = await new MiddlewareControllerCachedInstance(false, { portAppInstance: context.instance })
            let middlewareArray = await middlewareController.initializeNestedUnit({ nestedUnitKey: 'd908335b-b60a-4a00-8c33-b9bc4a9c64ec' })
            await implementMiddlewareOnModuleUsingJson(middlewareArray)(context, next)

            // context.instance.config.clientBasePath = await Application.config.clientBasePath
            // await next()          
        },
        // async (context, next) => {
        //     let self = Class
        //     // [1] Create instances and check conditions. Get callback either a function or document
        //     // The instance responsible for rquests of specific port.
        //     let conditionController = await new ConditionController(false, { portAppInstance: context.instance})
        //     let entrypointConditionTree = '78f91938-f9cf-4cbf-9bc8-f97836ff23dd'
        //     if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🍊 Entrypoint Condition Key: ${entrypointConditionTree} \n \n`)
        //     let callback = await conditionController.initializeConditionTree({nestedUnitKey: entrypointConditionTree})
        //     // if(process.env.SZN_DEBUG == 'true') console.log(`🍊 Callback object: ${callback.name}`)
        //     // [2] Use callback
        //     if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🔀✔️ Choosen callback is: %c ${callback.name}`, self.config.style.green)
        //     if(!callback) console.log('condition checking failed !')
        //     if(callback.name == '') {
        //         console.log(callback)
        //         callback = { name: 'a7912856-ad5a-46b0-b980-67fb500af399', type: 'middlewareNestedUnit' }
        //     }
        // },
        async (context, next) => { // CONDITION
            let self = Class
            // [1] Create instances and check conditions. Get callback either a function or document
            // The instance responsible for rquests of specific port.
            let conditionController = await new ConditionControllerCachedInstance(false, { portAppInstance: context.instance})
            let entrypointConditionTree = '78f91938-f9cf-4cbf-9bc8-f97836ff23dd'
            if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🍊 Entrypoint Condition Key: ${entrypointConditionTree} \n \n`)
            let callback = await conditionController.initializeConditionTree({nestedUnitKey: entrypointConditionTree})
            // if(process.env.SZN_DEBUG == 'true') console.log(`🍊 Callback object: ${callback.name}`)
            // [2] Use callback
            if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🔀✔️ Choosen callback is: %c ${callback.name}`, self.config.style.green)
            if(!callback) console.log('condition checking failed !')
            if(callback.name == '') {
                console.log(callback)
                callback = { name: 'a7912856-ad5a-46b0-b980-67fb500af399', type: 'middlewareNestedUnit' }
            }
            await implementConditionActionOnModuleUsingJson({setting: callback})(context, next)
        }, 
        async (context, next) => {
            // console.log('Last Middleware reached.')
            await next()
        },
    ])
    Class.createHttpServer()
})

// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.eventEmitter.on('initializationEnd', () => {
    let Class = ApiClass
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            context.set('connection', 'keep-alive')
            context.set('Access-Control-Allow-Origin', '*')
            await context.req.setTimeout(30000);                        
            await next()
        },
        // async (context, next) => {
        //     let middleware;
        //     let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
        //     middlewareArray = await middwareController.initializeNestedUnit({ nestedUnitKey: '' })
        //     await implementMiddlewareOnModuleUsingJson(middlewareArray)(context, next)
        // },
        // async (context, next) => {
        //     context.instance.middlewareArray[0](context, next)
        // },
        restEndpointApi.route(),
    ])
    Class.createHttpServer()
})

// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.eventEmitter.on('initializationEnd', () => {
    let Class = WebSocketClass
    Class.createWebsocketServer()
    Class.webSocketServer.on('connection', function connection(ws) {
        // console.log('client connected !')
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);  
            Class.webSocketServer.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocketModule.OPEN) {
                  client.send(message);
                }
              });
        });
        var i = 0
        
        // setInterval(function() {
        //     i++
        //     console.log('interval running ! ' + i)
            if(ws.readyState == WebSocketModule.OPEN) ws.send(i);
        // }, 500);    
    });

})


// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.initialize() // allows calling a child class from its parent class.

// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment


