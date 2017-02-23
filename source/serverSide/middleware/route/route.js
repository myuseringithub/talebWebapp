import {default as serverConfig} from 'configuration/serverConfig.js'
import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import compose from 'koa-compose'
import r from 'rethinkdb'
import Router from 'koa-router'
import { handleConnection } from 'middleware/database/commonDatabaseFunctionality.js'
import {default as customQuery} from 'middleware/database/customQuery.js'

let routerAPI = new Router({ prefix: '/api/v1' })
routerAPI.get('/test', customQuery.test)

export default () => compose([
    handleConnection, // Open connection on middleware downstream, Close connection on upstream.
    routerAPI.routes(),
    routerAPI.allowedMethods()
])