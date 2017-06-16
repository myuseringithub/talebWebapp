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
        async (context, next) => {
            let middleware;
            let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
            middleware = await middlewareController.initializeNestedUnit({ nestedUnitKey: '0adb621b-ae9d-4d4c-9166-16aefbfe0e21' })
            await implementMiddlewareOnModuleUsingJson(middleware)(context, next)
        },
        // async (context, next) => {
        //     let middleware;
        //     let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
        //     middleware = await middlewareController.initializeNestedUnit({ nestedUnitKey: '0adb621b-ae9d-4d4c-9166-16aefbfe0e21' })
        //     await implementMiddlewareOnModuleUsingJson(middleware)(context, next)
        // },
        // async (context, next) => {
        //     let middleware;
        //     let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
        //     middleware = await middlewareController.initializeNestedUnit({ nestedUnitKey: '1b18ecb2-b281-4cb6-a3fa-6d3bdf9c583d' })
        //     await implementMiddlewareOnModuleUsingJson(middleware)(context, next)
        // },
        // async (context, next) => {
        //     let middleware;
        //     let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
        //     middleware = await middlewareController.initializeNestedUnit({ nestedUnitKey: '27af18c4-d2b1-4420-951c-bb3933184f6d' })
        //     await implementMiddlewareOnModuleUsingJson(middleware)(context, next)
        // },
        // async (context, next) => {
        //     let middleware;
        //     let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
        //     middleware = await middlewareController.initializeNestedUnit({ nestedUnitKey: 'cfa43f4b-f351-46e1-92e4-40636f279eb9' })
        //     await implementMiddlewareOnModuleUsingJson(middleware)(context, next)
        // },
        // async (context, next) => {
        //     let middleware;
        //     let middlewareController = await new MiddlewareController(false, { portAppInstance: context.instance })
        //     middleware = await middlewareController.initializeNestedUnit({ nestedUnitKey: '7d0e5a56-f5a0-4d5b-b329-bbf1cccd4552' })
        //     await implementMiddlewareOnModuleUsingJson(middleware)(context, next)
        // },
        async (context, next) => {
            let isCalledNext = await context.instance.applyConditionCallback(next)
            if(!isCalledNext) next()
        }, 
        async (context, next) => {
            console.log('Last Middleware.')
            await next()
        }, 
    ])
    Class.createHttpServer()
})

Application.eventEmitter.on('initializationEnd', () => {
    let Class = StaticContentClass
    // Templating engine & associated extention.
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    let middlewareSequence = [
        {
            name: 'useragentDetection',
            executionType: 'middleware',
            functionPath: 'appscript/utilityFunction/middleware/useragentDetection.middleware.js'
        },
        {
            name: 'jspm.config.js static file',
            arguments: {
                filePath: `/jspm_packageManager/jspm.config.js`,
                urlPath: '/asset/javascript/jspm.config.js',
                options: { gzip: true },
            },
            executionType: 'regularFunction',
            functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFile.middlewareGenerator.js'
        },
        {
            name: 'static assets',
            arguments: {
                directoryPath: `/asset/`,
                urlPath: '/asset',
                options: { gzip: true },
            },
            executionType: 'regularFunction',
            functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticDirectory.middlewareGenerator.js'
        },
        {   // [NOT EXACTLY] Overrides that of the above general rule for asset folder subfiles.
            name: 'document-element.html static file',
            arguments: {
                filePath: `/asset/webcomponent/document-element/document-element.html`,
                urlPath: '/asset:render/webcomponent/document-element/document-element.html',
                options: { gzip: true },
            },
            executionType: 'regularFunction',
            functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFileRenderTemplate.middlewareGenerator.js'
        },
        {
            name: 'static uploaded files',
            arguments: {
                directoryPath: `/upload/`,
                urlPath: '/upload',
                options: { gzip: true },
            },
            executionType: 'regularFunction',
            functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticDirectory.middlewareGenerator.js'
        },
    ]
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            context.set('Access-Control-Allow-Origin', '*')
            context.set('connection', 'keep-alive')
            await next()
        },
        implementMiddlewareOnModuleUsingJson(middlewareSequence),
    ])
    Class.createHttpServer()
})

Application.eventEmitter.on('initializationEnd', () => {
    let Class = ApiClass
    let middlewareSequence = [
        {
            name: "commonFunctionality middlewares",
            executionType: 'regularFunction',
            functionPath: 'appscript/utilityFunction/middleware/serverCommonFunctionality.js'
        }
    ]
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            await next()
            context.set('connection', 'keep-alive')
            context.set('Access-Control-Allow-Origin', '*')
        },
        // async (context, next) => {
        //     context.instance.middlewareArray[0](context, next)
        // },
        restEndpointApi.route(),
    ])
    Class.createHttpServer()
})


Application.initialize() // allows calling a child class from its parent class.

// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment


