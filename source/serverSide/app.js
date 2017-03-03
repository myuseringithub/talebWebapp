// require(`${App.config.serverBasePath}/configuration.js`) // Load configuration settings.
import AppClass from 'class/App.class.js'
global.App = new AppClass()
import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import Koa from 'koa' // Koa applicaiton server
import route from 'middleware/route/route.js' // Routes & API
import serverCommonFunctionality from 'middleware/serverCommonFunctionality.js' // Middleware extending server functionality
import serverStaticFile from 'middleware/serverStaticFile.js' // Middleware extending server functionality
import notFound from 'middleware/notFound.js'
import RestApi from 'middleware/database/restEndpointApi.js'
let restEndpointApi = new RestApi('api/v1')
let eventEmitter = new (require('events').EventEmitter)
import underscore from 'underscore'

import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session' // Session
import push from 'koa-server-push' // HTTP/2 push.
// TODO: install embeddedjs, underscore templating
// TODO: koa-subdomain

let template = require('templatingSystem/app.js')

// KOA Middleware 

const serverKoa = module.exports = new Koa() // export if script is required.
if(App.config.DEPLOYMENT == 'development') serverKoa.subdomainOffset = 1 // i.e. localhost

serverKoa
    .use(async (context, next) => {
        await (context.SZN = global.SZN || {}) // Initialize SZN namespace in koa server context
        await next()
    })
    .use(async (context, next) => {
        // context.body = template
        await next()
    })
    .use(serverCommonFunctionality())
    .use(notFound())
    .use(serverStaticFile())
    .use(route())
    .use(restEndpointApi.route()) 

// Conneciton ports:
if (!module.parent || module.parent) { // Dummy for future use // if loaded as a standart script.
    http.createServer(serverKoa.callback()).listen(App.config.port, ()=> {
        console.log(`listening on port ${App.config.port}`)
        // eventEmitter.emit('listening')
        // process.emit('listening')
        if(App.config.DEPLOYMENT == 'development') process.send({ message: 'Server listening'});
    })
    // eventEmitter.on("listening", function () { console.log("catched listening on same script file"); })
    http.on
    if(App.config.ssl) {
        let options = {
            key: fs.readFileSync('./sampleSSL/server.key'),
            cert: fs.readFileSync('./sampleSSL/server.crt')
        }
        https.createServer(options, serverKoa.callback()).listen(443, () => {
            console.log('listening on port 443')
        })
    } 
}


// PURE NODEJS _____________________________________________

// http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'application/json'});
//   response.end(response);
// }).listen(80)

