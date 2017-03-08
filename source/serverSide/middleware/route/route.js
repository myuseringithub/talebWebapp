import {default as serverConfig} from 'configuration/serverConfig.js'
import compose from 'koa-compose'
import Router from 'koa-router'
import {default as customQuery} from 'middleware/database/customQuery.js'

let routerAPI = new Router({ prefix: '/api/v1' })
routerAPI.get('/test', customQuery.test)

export default () => compose([
    routerAPI.routes(),
    routerAPI.allowedMethods()
])