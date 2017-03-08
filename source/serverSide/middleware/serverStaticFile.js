import compose from 'koa-compose'
import r from 'rethinkdb'

// let staticMiddlewareSetting = r
//     .table('setting') // first field assigns name of table
//     .run(context.SZN.rethinkdbConn)
//     .then((cursor) => {
//         return cursor.toArray()
//     })
let staticMiddlewareSetting = [
    {
        name: 'jspm.config.js static file',
        filePath: '../clientSide/jspm_packageManager/jspm.config.js',
        urlPath: '/asset/javascript/jspm.config.js',
        options: { 
            gzip: true
        },
        functionPath: 'middleware/static/serveStaticSingleFile.middlewareGenerator.js'
    },
    {
        name: 'static assets',
        directoryPath: '../clientSide/asset/',
        urlPath: '/asset',
        options: { 
            gzip: true
        },
        functionPath: 'middleware/static/serveStaticDirectory.middlewareGenerator.js'
    },
    {
        name: 'static uploaded files',
        directoryPath: '../clientSide/upload/',
        urlPath: '/upload',
        options: { 
            gzip: true
        },
        functionPath: 'middleware/static/serveStaticDirectory.middlewareGenerator.js'
    },
]

let middlewareArray = [] 

staticMiddlewareSetting.forEach((setting) => {
    let middleware = require(`${setting.functionPath}`)(setting)
    middlewareArray.push(middleware) 
}, this);

export default () => compose(middlewareArray)
