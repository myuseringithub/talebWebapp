// API server
import Koa from 'koa' // Koa applicaiton server
import Application from 'appscript'

const self = class Api extends Application {

    static serverKoa;
    static port;
    static url;
    static middlewareArray = []
    middlewareArray = []

    static initializeStaticClass() {
        self.eventEmitter.on('initializationEnd', () => {
            let ClassObject = {}
            ClassObject[`${self.name}`] = self
            self.addStaticSubclassToClassArray(ClassObject)
        })
        super.initializeStaticClass()
        self.port = 8082
        self.url = `${self.config.PROTOCOL}api.${self.config.HOST}/`
    }
    constructor() {
        super(true)
    }

}

self.initializeStaticClass() // initialize static properties on class.
export default self