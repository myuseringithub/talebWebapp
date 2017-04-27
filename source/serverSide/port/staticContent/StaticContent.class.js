// Static content server - could be upgraded to Content Delivery Network
import Koa from 'koa' // Koa applicaiton server
import Application from 'appscript'

const self = class StaticContent extends Application {

    static serverKoa;
    static port;
    static url;
    static middlewareArray = []
    middlewareArray = []
    
    static initializeStaticClass() {
        super.initializeStaticClass()
        self.port = 8081
        self.url = `${self.config.PROTOCOL}cdn.${self.config.HOST}`
    }
    constructor() {
        super(true)
        this.config = {}
    }

}

self.initializeStaticClass() // initialize static properties on class.
export default self