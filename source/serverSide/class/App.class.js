import configuration from 'configuration/configuration.export.js' // Load configuration settings.
import Koa from 'koa' // Koa applicaiton server
import compose from 'koa-compose'

import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import r from 'rethinkdb'
import { connect, getConditionTreeEntrypoint} from 'middleware/database/commonDatabaseFunctionality.js'

import ConditionTreeClass from 'class/ConditionTree.class.js'

class App {

    static context = {}
    static subclassArray = [
        'class/StaticContent.class.js',
        'class/Api.class.js',
        'class/Test.class.js',
    ]
    static rethinkdbConnection = {}
    static classInstanceArray = []
    static entrypointConditionTree = 'default'
    
    middlewareArray = []
    conditionTreeArray = []

    constructor(skipConstructor = false) {
        if(skipConstructor) return;
        // if (!new.target) console.log(new.target) // not supported by babel
        // if (!(this instanceof App)) return new App() // This is used in factory functions not classes.
        this.config = configuration
        this.initializeSubclass()
        this.createKoaServer()
    }
    // static createInstance() {
    //     return new App()
    // }

    initializeSubclass() { // Create subclasses instances and add them to the static array.
        App.subclassArray.forEach((subclassPath) => {
            let subclass = require(subclassPath)
            let subclassName = subclass.name
            App.classInstanceArray[subclassName] = new subclass()
        }, this);
    }

    initializeConditionTree() {

    }

    createKoaServer() {
        this.serverKoa = new Koa() // export if script is required.
        if(this.config.DEPLOYMENT == 'development') serverKoa.subdomainOffset = 1 // i.e. localhost
    }
    
    async applyKoaMiddleware() {
        await this.middlewareArray.forEach((middleware) => {
            this.serverKoa.use(middleware)
        }, this);
    }

    async applyConditionCallback(context = App.context) {
        await ConditionTreeClass.initializeAllConditionTree();
        let middleware = require('middleware/test.middleware.js')()
        this.serverKoa.use(middleware)

        // this.conditionTreeArray
        // App.classInstanceArray['ConditionTree'].getConditionTree()
        // let conditionTreeEntrypoint = await getConditionTreeEntrypoint(context = App.context)
        // let entrypointCallback = conditionTreeEntrypoint.shift().callback
        // // if(require('file/condition/method.condition.js')(context) == 'GET') {
        //     let middleware = require(entrypointCallback.name)()
        //     this.serverKoa.use(middleware)
        // // }
    }

}

export default App