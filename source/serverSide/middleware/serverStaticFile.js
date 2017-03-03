import config from 'configuration/configuration.export.js'
import compose from 'koa-compose'
import serverStatic from 'koa-static' // Static files.
import mount from 'koa-mount'

export default () => compose([
    mount('/', serverStatic(config.rootPath, { 
        gzip: true,
        index: 'entrypoint.html'
    })),
    mount('/asset', serverStatic(config.assetPath, { gzip: true })),
    mount('/upload', serverStatic(config.uploadPath, { gzip: true }))
])
