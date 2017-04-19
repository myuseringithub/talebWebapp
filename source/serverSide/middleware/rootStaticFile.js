import compose from 'koa-compose'
import Application from 'class/Application.class.js'

let staticMiddlewareSetting = [
    {
        name: 'Service worker file',
        filePath: `/asset/javascript/serviceWorker/serviceWorker.js`,
        urlPath: '/serviceWorker.js', // determines the scope of the service worker.
        options: {
            gzip: true,
        },
        functionPath: 'middleware/static/serveStaticSingleFile.middlewareGenerator.js'
    },
    {
        name: 'Static root files',
        directoryPath: `/template/`,
        urlPath: '/',
        options: {
            gzip: true,
            // index: 'entrypoint.html'
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
