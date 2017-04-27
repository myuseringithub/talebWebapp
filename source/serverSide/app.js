// Modules
import path from 'path'
import filesystem from 'fs'
import views from 'koa-views'

// Classes
import Application from 'appscript'
import WebappUIClass from 'port/webappUI/WebappUI.class.js'
import StaticContentClass from 'port/staticContent/StaticContent.class.js'
import ApiClass from 'port/api/Api.class.js'
import ConditionTree from 'appscript/class/ConditionTree.class.js'
import Condition from 'appscript/class/Condition.class.js'
import NestedUnitController from 'appscript/class/NestedUnitController.class.js'

// Middlewares
import route from 'port/api/middleware/route/route.js' // Routes & API
import serverCommonFunctionality from 'appscript/utilityFunction/middleware/serverCommonFunctionality.js' // Middleware extending server functionality
import implementMiddlewareOnModuleUsingJson from 'appscript/utilityFunction/middleware/implementMiddlewareOnModuleUsingJson.js' // Middleware extending server functionality
import notFound from 'appscript/utilityFunction/middleware/notFound.js'
import useragentDetection from 'appscript/utilityFunction/middleware/useragentDetection.middleware.js'
import createClassInstancePerRequest from 'appscript/utilityFunction/middleware/createClassInstancePerRequest.middleware.js'
import RestApi from 'port/api/middleware/database/restEndpointApi.js'
let restEndpointApi = new RestApi('api/v1')

// TODO: Custom Dataset Schema/structure/blueprint, data document, custom dataset type, custom fields, custom content type.
// TODO: Condition Tree:
// • Ability to decide insertion position of unit in subtree. e.g. before, after, first, last.
// • Check non immediate children for each insertion point to insert them in their correct destination.
// • Define unique key for each child, to allow insertion into other inserted children. i.e. extending existing trees with other trees and children. 

Application.addSubclass([ConditionTree, Condition, NestedUnitController])
Application.initialize([StaticContentClass, WebappUIClass, ApiClass]) // allows calling a child class from its parent class.

{
    let Class = WebappUIClass
    // Templating engine & associated extention.
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            await next()
        },
        useragentDetection,
        notFound(),
        implementMiddlewareOnModuleUsingJson([
            {
                name: 'Service worker file',
                filePath: `/asset/javascript/serviceWorker/serviceWorker.js`,
                urlPath: '/serviceWorker.js', // determines the scope of the service worker.
                options: {
                    gzip: true,
                },
                functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFile.middlewareGenerator.js'
            },
            {
                name: 'Static root files',
                directoryPath: `/template/`,
                urlPath: '/',
                options: {
                    gzip: true,
                    // index: 'entrypoint.html'
                },
                functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticDirectory.middlewareGenerator.js'
            },
        ]),
        serverCommonFunctionality(),
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
}

{
    let Class = StaticContentClass
    // Templating engine & associated extention.
    Class.serverKoa.use(views('/', { map: { html: 'underscore', js: 'underscore' } } ));
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            context.set('Access-Control-Allow-Origin', '*')
            await next()
        },
        useragentDetection,
        implementMiddlewareOnModuleUsingJson([
            {
                name: 'jspm.config.js static file',
                filePath: `/jspm_packageManager/jspm.config.js`,
                urlPath: '/asset/javascript/jspm.config.js',
                options: { gzip: true },
                functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFile.middlewareGenerator.js'
            },
            {
                name: 'static assets',
                directoryPath: `/asset/`,
                urlPath: '/asset',
                options: { gzip: true },
                functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticDirectory.middlewareGenerator.js'
            },
            {   // [NOT EXACTLY] Overrides that of the above general rule for asset folder subfiles.
                name: 'document-element.html static file',
                filePath: `/asset/webcomponent/document-element/document-element.html`,
                urlPath: '/asset:render/webcomponent/document-element/document-element.html',
                options: { gzip: true },
                functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFileRenderTemplate.middlewareGenerator.js'
            },
            {
                name: 'static uploaded files',
                directoryPath: `/upload/`,
                urlPath: '/upload',
                options: { gzip: true },
                functionPath: 'appscript/utilityFunction/middleware/staticFile/serveStaticDirectory.middlewareGenerator.js'
            },
        ]),
    ])
    Class.createHttpServer()
}

{
    let Class = ApiClass
    Class.applyKoaMiddleware([
        createClassInstancePerRequest(Class),
        async (context, next) => {
            // instance.middlewareArray.push(middleware)
            await next()
            context.set('Access-Control-Allow-Origin', '*')
        },
        // async (context, next) => {
        //     context.instance.middlewareArray[0](context, next)
        // },
        serverCommonFunctionality(),
        restEndpointApi.route(),
    ])
    Class.createHttpServer()
}


// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment


