// Modules
import path from 'path'
import filesystem from 'fs'
import views from 'koa-views'

// Classes
import { default as Application } from 'appscript'
const ConditionController = require('appscript/module/condition')(Application)
const MiddlewareController = require('appscript/module/middleware')(Application)
// TODO: + initialize options for callback as functionMiddleware or document template rendering.

import WebappUIClass from 'port/webappUI/WebappUI.class.js'
import StaticContentClass from 'port/staticContent/StaticContent.class.js'
import ApiClass from 'port/api/Api.class.js'

// Middlewares
// import route from 'port/api/middleware/route/route.js' // Routes & API
import implementMiddlewareOnModuleUsingJson from 'appscript/utilityFunction/middleware/implementMiddlewareOnModuleUsingJson.js' // Middleware extending server functionality
import createClassInstancePerRequest from 'appscript/utilityFunction/middleware/createClassInstancePerRequest.middleware.js'
import RestApi from 'port/api/middleware/database/restEndpointApi.js'
let restEndpointApi = new RestApi('api/v1')

// TODO: Custom Dataset Schema/structure/blueprint, data document, csustom dataset type, custom fields, custom content type.
// TODO: Condition Tree:
// • Ability to decide insertion position of unit in subtree. e.g. before, after, first, last.
// • Check non immediate children for each insertion point to insert them in their correct destination.
// • Define unique key for each child, to allow insertion into other inserted children. i.e. extending existing trees with other trees and children. 

// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.eventEmitter.on('initializationEnd', () => {
    let Class = WebappUIClass
    // Templating engine & associated extention.
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    let middlewareSequence = [
            // {
            //     name: 'applyConditionCallback',
            //     entrypointConditionTreeKey: 'default',
            //     functionPath: ''
            // }
    ]
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            context.set('connection', 'keep-alive')
            await next()
        },
        // implementMiddlewareOnModuleUsingJson(middlewareSequence),
        async (context, next) => { // MIDDLEWARE
            let middlewareArray;
            let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
            middlewareArray = await middlewareController.initializeNestedUnit({ nestedUnitKey: '0adb621b-ae9d-4d4c-9166-16aefbfe0e21' })
            await implementMiddlewareOnModuleUsingJson(middlewareArray)(context, next)
        },
        async (context, next) => { // CONDITION
            let self = Class
            // [1] Create instances and check conditions. Get callback either a function or document
            // The instance responsible for rquests of specific port.
            let conditionController = await new ConditionController(false, { portAppInstance: context.instance})
            let entrypointConditionTree = self.entrypointSetting.defaultConditionTreeKey
            if(process.env.SZN_DEBUG == 'true') console.log(`🍊 Condition Key: ${entrypointConditionTree}`)
            let callback = await conditionController.initializeConditionTree({nestedUnitKey: entrypointConditionTree})
            if(process.env.SZN_DEBUG == 'true') console.log(`🍊 Callback object: ${callback.name}`)
            // [2] Use callback
            if(process.env.SZN_DEBUG == 'true') console.log(`🔀 Choosen callback is: %c ${callback.name}`, self.config.style.green)
            let isCalledNext = false
            switch(callback.type) {
                case 'functionMiddleware':
                    await context.instance.handleFunctionMiddleware(callback.name)
                    isCalledNext = true
                    break;
                case 'document':
                    await context.instance.handleTemplateDocument(callback.name)
                    break;
                default: 
                if(process.env.SZN_DEBUG == 'true') console.log('SZN - %c callback doesn\'t match any kind.', self.config.style.red)
            }             
        }, 
        async (context, next) => {
            console.log('Last Middleware.')
            await next()
        }, 
    ])
    Class.createHttpServer()
})

// ████████████████████████████████████████████████████████████████████████████████████████████████

Application.eventEmitter.on('initializationEnd', () => {
    let Class = StaticContentClass
    // Templating engine & associated extention.
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            context.set('Access-Control-Allow-Origin', '*')
            context.set('connection', 'keep-alive')
            await next()
        },
        async (context, next) => {
            let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
            let middlewareArray = await middlewareController.initializeNestedUnit({ nestedUnitKey: '47475dab-0987-40af-b8d4-e6c126ad3172' })
            await implementMiddlewareOnModuleUsingJson(middlewareArray)(context, next)
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
            await next()
            context.set('connection', 'keep-alive')
            context.set('Access-Control-Allow-Origin', '*')
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

Application.initialize() // allows calling a child class from its parent class.

// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment


