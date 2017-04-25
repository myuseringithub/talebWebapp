import compose from 'koa-compose'
import r from 'rethinkdb'
import Application from 'appscript'

// let staticMiddlewareSetting = r
//     .table('setting') // first field assigns name of table
//     .run(context.rethinkdbConnection)
//     .then((cursor) => {
//         return cursor.toArray()
//     })
let staticMiddlewareSetting = [
    {
        name: 'jspm.config.js static file',
        filePath: `/jspm_packageManager/jspm.config.js`,
        urlPath: '/asset/javascript/jspm.config.js',
        options: { gzip: true },
        functionPath: 'middleware/static/serveStaticSingleFile.middlewareGenerator.js'
    },
    {
        name: 'static assets',
        directoryPath: `/asset/`,
        urlPath: '/asset',
        options: { gzip: true },
        functionPath: 'middleware/static/serveStaticDirectory.middlewareGenerator.js'
    },
    {   // [NOT EXACTLY] Overrides that of the above general rule for asset folder subfiles.
        name: 'document-element.html static file',
        filePath: `/asset/webcomponent/document-element/document-element.html`,
        urlPath: '/asset:render/webcomponent/document-element/document-element.html',
        options: { gzip: true },
        functionPath: 'middleware/static/serveStaticSingleFileRenderTemplate.middlewareGenerator.js'
    },
    {
        name: 'static uploaded files',
        directoryPath: `/upload/`,
        urlPath: '/upload',
        options: { gzip: true },
        functionPath: 'middleware/static/serveStaticDirectory.middlewareGenerator.js'
    },
]

let middlewareArray = []

staticMiddlewareSetting.forEach((setting) => {
    let middleware = require(`${setting.functionPath}`)(setting)
    middlewareArray.push(middleware) 
}, this);

export default () => compose(middlewareArray)
