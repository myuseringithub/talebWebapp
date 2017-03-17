import configuration from 'configuration/configuration.export.js' // Load configuration settings.
import Koa from 'koa' // Koa applicaiton server
import compose from 'koa-compose'
import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import r from 'rethinkdb'
import { connect, getConditionTreeEntrypoint} from 'middleware/database/commonDatabaseFunctionality.js'

let subclassPath = {
    asInstance: [
        'class/StaticContent.class.js',
        'class/Api.class.js',
        'class/Test.class.js',
    ],
    asStatic: [
        // 'class/ConditionTree.class.js',
        // 'class/Condition.class.js',
    ]
}

const self = class App {

    static context = {} 
    static rethinkdbConnection = {}
    static extendedSubclass = {
        instance: [],
        static: []
    }

    static entrypointSetting = {
        defaultConditionTreeKey: 'default'
    }
    
    config = []
    middlewareArray = []

    constructor(skipConstructor = false, staticSubclassArray) {
        if(skipConstructor) return;
        // if (!new.target) console.log(new.target) // not supported by babel
        // if (!(this instanceof App)) return new App() // This is used in factory functions not classes.
        staticSubclassArray.map((subclass) => {
            this.registerStaticSubclass(subclass)
        })
        this.config = configuration
        this.createSubclassInstance()
        this.createKoaServer()
    }

    createSubclassInstance() { // Create subclasses instances and add to App static array.
        (subclassPath.asInstance).forEach((subclassPath) => {
            let subclass = require(subclassPath)
            self.extendedSubclass.instance[subclass.name] = new subclass()
        }, this)
    }

    registerStaticSubclass(subclass) { // Get subclasses constructors and add them to App static arrray.
        self.extendedSubclass.static[subclass.name] = subclass
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

    async applyConditionCallback(context = self.context) {
        let connection = context.rethinkdbConnection
        // [1] Create instances and check conditions.
        await self.extendedSubclass.static['ConditionTree'].initializeConditionTree(connection = connection, self.entrypointSetting.defaultConditionTreeKey);
        // [2] Use callback


        // await ConditionTreeClass.initializeAllConditionTree();
        // let middleware = require('middleware/test.middleware.js')()
        // this.serverKoa.use(middleware)

        // this.conditionTreeArray
        // self.classInstanceArray['ConditionTree'].getConditionTree()
        // let conditionTreeEntrypoint = await getConditionTreeEntrypoint(context = self.context)
        // let entrypointCallback = conditionTreeEntrypoint.shift().callback
        // // if(require('file/condition/method.condition.js')(context) == 'GET') {
        //     let middleware = require(entrypointCallback.name)()
        //     this.serverKoa.use(middleware)
        // // }
    }

}

export default self