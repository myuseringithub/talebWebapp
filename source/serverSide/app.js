// Modules
import path from 'path'
import filesystem from 'fs'
import views from 'koa-views'
import rethinkDB from 'rethinkdb' 
import WebSocketModule from 'ws'
import bodyParser from 'koa-bodyparser'

// Classes
import { default as Application } from 'appscript'
const ConditionController = require('appscript/module/condition')
const MiddlewareController = require('appscript/module/middleware')
// TODO: + initialize options for callback as functionMiddleware or document template rendering.

import WebappUIClass from 'port/webappUI/WebappUI.class.js'
import OAuthClass from 'port/oAuth/OAuth.class.js'
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

    async function createTableAndInsertData(databaseName, databaseData) {
        for (let tableData of databaseData) {
            await rethinkDB.db(databaseName).tableCreate(tableData.databaseTableName).run(connection)
                .then(async tableCreationResponse => {
                    if(tableCreationResponse.tables_created > 0) console.log(`📢 ${tableData.databaseTableName} table created.`)
                    await rethinkDB.db(databaseName).table(tableData.databaseTableName).insert(tableData.data).run(connection)
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
        .then(async () => {
            await createTableAndInsertData('webappSetting', databaseData.webappSetting)
        })
        .then(async () => { // initialize template document front end.
            const self = Application
            let getTableDocument = {
                generate: require('appscript/utilityFunction/database/query/getTableDocument.query.js'),
                instance: []
            }
            getTableDocument.instance['template_documentFrontend'] = await getTableDocument.generate('template_documentFrontend')
            const documentFrontendData = await getTableDocument.instance['template_documentFrontend'](self.rethinkdbConnection)
            self.frontend = { // Configurations passed to frontend 
                config: self.config,
                setting: {
                    location: {
                        routeBasePath: `${self.config.PROTOCOL}${self.config.HOST}`
                    }
                },
                route: 'route',
                document: documentFrontendData,
            }    
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

// ████████████████████████████████████████████████████████████████████████████████████████████████
Application.eventEmitter.on('initializationEnd', async () => {
    let Class = OAuthClass
    // Templating engine & associated extention.
    let MiddlewareControllerCachedInstance = await MiddlewareController({superclass: Application})
    let ConditionControllerCachedInstance = await ConditionController({superclass: Application})
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
        async (context, next) => { // CONDITION
            let self = Class
            // [1] Create instances and check conditions. Get callback either a function or document
            // The instance responsible for rquests of specific port.
            let conditionController = await new ConditionControllerCachedInstance(false, { portAppInstance: context.instance})
            let entrypointConditionTree = '0681f25c-4c00-4295-b12a-6ab81a3cb440'
            if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🍊 Entrypoint Condition Key: ${entrypointConditionTree} \n \n`)
            let callback = await conditionController.initializeConditionTree({nestedUnitKey: entrypointConditionTree})
            if(process.env.SZN_DEBUG == 'true' && context.header.debug == 'true') console.log(`🔀✔️ Choosen callback is: %c ${callback.name}`, self.config.style.green)
            // [2] Use callback
            await implementConditionActionOnModuleUsingJson({setting: callback})(context, next)
            
            if(callback && callback.name == 'post') { // for testing purposes.
                let x = await Class.authenticate(context.request, context.response)
                if(x) await next()
            }
        }, 
        async (context, next) => {
            context.status = 404            
            // console.log('Last Middleware reached.')
            await next()
        },
    ])
    Class.createHttpServer()
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
    let MiddlewareControllerCachedInstance = await MiddlewareController({superclass: Application})
    let ConditionControllerCachedInstance = await ConditionController({superclass: Application})
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
            // console.log('Last Middleware reached.')
            await next()
        }, 
    ])
    Class.createHttpServer()
})

// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.eventEmitter.on('initializationEnd', async () => {
    let Class = StaticContentClass
    // Templating engine & associated extention.
    let MiddlewareControllerCachedInstance = await MiddlewareController({superclass: Application})
    let ConditionControllerCachedInstance = await ConditionController({superclass: Application})
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        bodyParser(),        
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            // await context.req.setTimeout(0); // changes default Nodejs timeout (default 120 seconds).          
            await context.set('Access-Control-Allow-Origin', '*')
            await context.set('connection', 'keep-alive')

            // // Authorization access example:
            // let token = await OAuthClass.authenticateMiddleware()(context.request, context.response);
            // if(token) {
            //     await next()
            // } else {
            //     console.log('Sorry unauthorized access')
            // }

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
