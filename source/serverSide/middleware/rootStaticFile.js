import compose from 'koa-compose'

let staticMiddlewareSetting = [
    {
        name: 'Static root files',
        directoryPath: '../clientSide/root/',
        urlPath: '/',
        options: {
            gzip: true,
            index: 'entrypoint.html'
        },
        functionPath: 'middleware/static/serveStaticDirectory.middlewareGenerator.js'
    },
    {
        name: 'Service worker',
        directoryPath: '../clientSide/asset/javascript/serviceWorker/',
        urlPath: '/serviceWorker',
        options: {
            gzip: true,
            index: 'entrypoint.html'
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
