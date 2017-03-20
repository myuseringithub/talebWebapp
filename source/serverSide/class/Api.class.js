// API server
import Koa from 'koa' // Koa applicaiton server
import Application from 'class/Application.class.js'

const self = class Api extends Application {

    static serverKoa;
    static port;
    static middlewareArray = []
    middlewareArray = []

    static initializeStaticClass() {
        super.initializeStaticClass()
        self.port = 8082
    }
    constructor() {
        super(true)
    }

}

self.initializeStaticClass() // initialize static properties on class.
export default self