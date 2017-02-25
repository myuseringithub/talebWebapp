import serverConfig from 'configuration/serverConfig.js'
import compose from 'koa-compose'
import responseTime from 'koa-response-time'
import logger from 'koa-logger'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import helmet from 'koa-helmet'
import error from 'koa-json-error'
import enforceHTTPS from 'koa-sslify'

let middleware = [
    responseTime(), // Response time x-response-time
    logger(), // Console logger
    bodyParser(),
    // cors(), // Cross-Origin Resource Sharing(CORS)
    error() // Error handler for pure-JSON Koa apps
]
if(!serverConfig.ssl) { 
    // middleware.push(compress())  // Compress responses
    // middleware.push(enforceHTTPS())
    // middleware.push(helmet()) // Security header middleware collection
}

export default () => compose(middleware)
