import ApiClass from 'port/api/Api.class.js'
import createClassInstancePerRequest from 'appscript/utilityFunction/middleware/createClassInstancePerRequest.middleware.js'
import RestApi from 'port/api/middleware/database/restEndpointApi.js'
let restEndpointApi = new RestApi('api/v1')

export default () => {
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
}