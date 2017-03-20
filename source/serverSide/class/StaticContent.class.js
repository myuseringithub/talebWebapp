// Static content server - could be upgraded to Content Delivery Network
import Koa from 'koa' // Koa applicaiton server
import Application from 'class/Application.class.js'

const self = class StaticContent extends Application {

    static serverKoa;
    static port;
    static middlewareArray = []
    middlewareArray = []
    
    static initializeStaticClass() {
        super.initializeStaticClass()
        self.port = 8081
    }
    constructor() {
        super(true)
    }

}

self.initializeStaticClass() // initialize static properties on class.
export default self