// Static content server - could be upgraded to Content Delivery Network
import Koa from 'koa' // Koa applicaiton server
import AppClass from 'class/App.class.js'

class StaticContent extends AppClass {

    middlewareArray = []
    
    constructor() {
        super(true)
        this.port = 8081
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

export default StaticContent