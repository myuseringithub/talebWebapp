import Application from 'class/Application.class.js'
import NestedUnitController from 'class/NestedUnitController.class.js'
import { connect, getConditionTreeEntrypoint } from 'middleware/database/commonDatabaseFunctionality.js'
import _ from 'underscore'
import filesystem from 'fs'

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
        this.config = {}
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
        console.log(`🔀 Choosen callback is: %c ${callback.name}`, self.config.style.green)
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
                console.log('SZN - %c callback doesn\'t match any kind.', self.config.style.red)
        }
        return isCalledNext;
    }

    async handleFunctionMiddleware(filePath) {
        let middleware = await require(`${filePath}`)
        middleware(this.context, this.next)
    }

    async handleTemplateDocument(documentKey) {
        switch (documentKey) {
            case 'entrypoint':
                // let argument = {
                //     layoutElement: 'webapp-layout-list'
                // }
                // let mainDocumentElement = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/document-element/document-element.html`, 'utf-8')
                // let mainDocumentElementImport = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/document-element/document-element.import.html`, 'utf-8')
                let argument = {}
                let entrypointJSFile = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/entrypoint.js.html`, 'utf-8')
                let metadata = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/asset/metadata/metadata.html`, 'utf-8')
                let view = {
                    metadata: _.template(metadata, {Application, argument}),
                    header: _.template(entrypointJSFile, {Application, argument}),
                    // body: _.template(mainDocumentElement, {Application, argument})
                }
                await this.context.render(`${this.context.instance.config.clientBasePath}/template/root/entrypoint.html`, {
                    Application,
                    view,
                    argument
                });
                break;
            default:
        }
    }
    
}

self.initializeStaticClass() // initialize static properties on class.
export default self