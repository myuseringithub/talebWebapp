import Application from 'class/Application.class.js'
import config from 'configuration/configuration.export.js'
import path from 'path'
import send from 'koa-sendfile' // Static files.
import mount from 'koa-mount'
import _ from 'underscore'

// returns a middleware object 
export default function serveStaticSingleFile(setting) {
    let filePath = path.resolve(path.normalize(`${config.serverBasePath}/${setting.filePath}`)) 
    let argument = {
        layoutElement: 'webapp-layout-list'
    }
    let view = {};

    let middleware = async (context, next) => {
        if(setting.urlPath == context.path) {
            return context.render(filePath, {
                Application,
                view,
                argument
            });
        }
        await next()
    }
    return middleware
}

