import APP from 'configuration/configuration.export.js'
import compose from 'koa-compose'
import serverStatic from 'koa-static' // Static files.

export default () => compose([
    serverStatic(APP.rootPath, { gzip: true }),
    serverStatic(APP.uploadsPath, { gzip: true })
])
