import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
let eventEmitter = new (require('events').EventEmitter)
import colors from 'colors' // https://github.com/marak/colors.js/

import route from 'middleware/route/route.js' // Routes & API
import serverCommonFunctionality from 'middleware/serverCommonFunctionality.js' // Middleware extending server functionality
import serverStaticFile from 'middleware/serverStaticFile.js' // Middleware extending server functionality
import rootStaticFile from 'middleware/rootStaticFile.js' // Middleware extending server functionality
import notFound from 'middleware/notFound.js'
import RestApi from 'middleware/database/restEndpointApi.js'
let restEndpointApi = new RestApi('api/v1')
// require(`${App.config.serverBasePath}/configuration.js`) // Load configuration settings.
import AppClass from 'class/App.class.js'




// global.App = new AppClass()
let App = new AppClass()
// let staticContentServer = App.classInstanceArray['StaticContent']
App.middlewareArray = [
    async (context, next) => {
        await (AppClass.context = context)
        await (context.SZN = global.SZN || {}) // Initialize SZN namespace in koa server context
        await next()
    },
    // notFound(),
    // rootStaticFile(),
    serverCommonFunctionality(),
    async (context, next) => {
        App.applyConditionCallback()
        await next()
    },
]
App.applyKoaMiddleware()
// App server
http.createServer(App.serverKoa.callback())
    .listen(App.config.port, ()=> {
        console.log(`${App.constructor.name} listening on port ${App.config.port}`.green)
        // eventEmitter.emit('listening')
        // process.emit('listening')
        if(App.config.DEPLOYMENT == 'development') process.send({ message: 'Server listening'});
    })
// eventEmitter.on("listening", function () { console.log("catched listening on same script file"); })
if(App.config.ssl) {
    let options = {
        key: fs.readFileSync('./sampleSSL/server.key'),
        cert: fs.readFileSync('./sampleSSL/server.crt')
    }
    https.createServer(options, App.serverKoa.callback())
        .listen(443, () => {
            console.log(`${App.constructor.name} listening on port 443`.green)
        })  
}




let StaticContent = App.constructor.classInstanceArray['StaticContent']
StaticContent.middlewareArray = [
    async (context, next) => {
        await (context.SZN = global.SZN || {}) // Initialize SZN namespace in koa server context
        await next()
        context.set('Access-Control-Allow-Origin', '*')
    },
    serverStaticFile(),
]
StaticContent.applyKoaMiddleware()
http.createServer(StaticContent.serverKoa.callback())
    .listen(StaticContent.port, ()=> {
        console.log(`${StaticContent.constructor.name} listening on port ${StaticContent.port}`.green)
    })





let Api = App.constructor.classInstanceArray['Api']
Api.middlewareArray = [
    async (context, next) => {
        // context.body = template
        await next()
        context.set('Access-Control-Allow-Origin', '*')
    },
    serverCommonFunctionality(),
    restEndpointApi.route(),
]
Api.applyKoaMiddleware()
http.createServer(Api.serverKoa.callback())
    .listen(Api.port, ()=> {
        console.log(`${Api.constructor.name} listening on port ${Api.port}`.green)
    })





let Test = App.constructor.classInstanceArray['Test']
Test.middlewareArray = [
    async (context, next) => {
        context.set('Access-Control-Allow-Origin', '*')
        context.body = 'Using Middleware of Test Server.'
        await next()
    },
    async (context, next) => {
        context.body = require('file/function/getUrlPathLevel2.js')(context)
        await next()
    },
]
Test.applyKoaMiddleware()
http.createServer(Test.serverKoa.callback())
    .listen(Test.port, ()=> {
        console.log(`${Test.constructor.name} listening on port ${Test.port}`.green)
    })

// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment

// // Conneciton ports:
// if (!module.parent || module.parent) { // Dummy for future use // if loaded as a standart script.

// }

// TODO: Look at these libraries:
// import bodyParser from 'koa-bodyparser'
// import session from 'koa-session' // Session
// import push from 'koa-server-push' // HTTP/2 push.
// koa-subdomain

// PURE NODEJS _____________________________________________

// http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'application/json'});
//   response.end(response);
// }).listen(8082)


