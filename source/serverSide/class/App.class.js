import configuration from 'configuration/configuration.export.js' // Load configuration settings.
import Koa from 'koa' // Koa applicaiton server
import compose from 'koa-compose'

let template = require('templatingSystem/app.js')

class App {
    
    static subclassArray = [
        'class/StaticContent.class.js',
        'class/Api.class.js'
    ]

    static classInstanceArray = []

    middlewareArray = []

    constructor(skipConstructor = false) {
        if(skipConstructor) return;
        // if (!new.target) console.log(new.target) // not supported by babel
        // if (!(this instanceof App)) return new App() // This is used in factory functions not classes.
        
        this.initialize()
    }
    // static createInstance() {
    //     return new App()
    // }

    initialize() {
        this.config = configuration
        this.initializeSubclass()
        this.createKoaServer()
    }

    initializeSubclass() { // Create subclasses instances and add them to the static array.
        App.subclassArray.forEach((subclassPath) => {
            let subclass = require(subclassPath)
            let subclassName = subclass.name
            App.classInstanceArray[subclassName] = new subclass()
        }, this);
    }

    createKoaServer() {
        this.serverKoa = new Koa() // export if script is required.
        if(this.config.DEPLOYMENT == 'development') serverKoa.subdomainOffset = 1 // i.e. localhost
    }
    
    applyKoaMiddleware() {
        this.middlewareArray.forEach((middleware) => {
            this.serverKoa.use(middleware)
        }, this);
    }
}

export default App