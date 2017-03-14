// API server
import Koa from 'koa' // Koa applicaiton server
import AppClass from 'class/App.class.js'

class Test extends AppClass {

    middlewareArray = []

    constructor() {
        super(true)
        this.port = 8083
        this.createKoaServer()
    }

    createKoaServer() {
        this.serverKoa = new Koa() // export if script is required.
    }

    applyKoaMiddleware() {
        this.middlewareArray.forEach((middleware) => {
            this.serverKoa.use(middleware)
        }, this);
    }

}

export default Test