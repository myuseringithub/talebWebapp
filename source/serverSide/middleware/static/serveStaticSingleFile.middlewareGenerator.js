import config from 'configuration/configuration.export.js'
import path from 'path'
import send from 'koa-sendfile' // Static files.
import mount from 'koa-mount'

// returns a middleware object 
export default function serveStaticSingleFile(setting) {
    let filePath = path.resolve(path.normalize(`${config.serverBasePath}/${setting.filePath}`)) 
    let middleware = async (context, next) => {
        if(setting.urlPath == context.path) return send(context, filePath);
        await next()
    }
    return middleware
}

