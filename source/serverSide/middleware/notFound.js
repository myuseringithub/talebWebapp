import path from 'path'
import APP from 'configuration/configuration.export.js' // Load configuration settings.
import send from 'koa-sendfile'

export default () => {
    return async (context, next) => { // fallback to sending the app index. If not found.
        await next()
        if(404 != context.status) return;
        return send(context, path.normalize(`${APP.rootPath}/index.html`))
    }
}