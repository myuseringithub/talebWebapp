import Application from 'class/Application.class.js'
import NestedUnitController from 'class/NestedUnitController.class.js'
import { connect, getConditionTreeEntrypoint } from 'middleware/database/commonDatabaseFunctionality.js'

const self = class WebappUI extends Application {

    static serverKoa;
    static port;
    static entrypointSetting = {
        defaultConditionTreeKey: 'default'
    }
    static middlewareArray = []
    middlewareArray = []
    next;

    static initializeStaticClass() {
        super.initializeStaticClass()
        self.port = 80
    }
    constructor(skipConstructor = false) {
        super(true)
        if(skipConstructor) return;
        // if (!new.target) console.log(new.target) // not supported by babel
        // if (!(this instanceof WebappUI)) return new WebappUI() // This is used in factory functions not classes.
    }
   
    async applyConditionCallback(next) {
        this.next = next
        // [1] Create instances and check conditions. Get callback either a function or document
        let entrypointConditionTree = self.entrypointSetting.defaultConditionTreeKey
        let conditionTreeController = await new NestedUnitController(false)
        let callback = await conditionTreeController.initializeConditionTree(entrypointConditionTree, this)
        // [2] Use callback
        // console.log(self.count); console.log(`Choosen callback is:`); console.log(callback)
        let isCalledNext = false
        switch(callback.type) {
            case 'functionMiddleware':
                await this.handleFunctionMiddleware(callback.name)
                isCalledNext = true
                break;
            case 'document':
                await this.handleTemplateDocument(callback.name)
                break;
            default: 
                console.log('SZN - callback doesn\'t match any kind.')
        }
        return isCalledNext;
    }

    async handleFunctionMiddleware(filePath) {
        let middleware = await require(`${filePath}`)()
        middleware(this.context, this.next)
    }

    async handleTemplateDocument(documentKey) {
        console.log(documentKey)
    }
}

self.initializeStaticClass() // initialize static properties on class.
export default self