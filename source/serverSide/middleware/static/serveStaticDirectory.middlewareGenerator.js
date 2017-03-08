import config from 'configuration/configuration.export.js'
import path from 'path'
import serverStatic from 'koa-static' // Static files.
import mount from 'koa-mount'

// returns a middleware object 
export default function serveStaticDirectory(setting) {
    let directoryPath = path.resolve(path.normalize(`${config.serverBasePath}/${setting.directoryPath}`)) 
    let middleware = mount(setting.urlPath, serverStatic(directoryPath, setting.options))
    return middleware
}

