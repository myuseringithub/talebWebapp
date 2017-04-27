import Application from 'appscript'
import _ from 'underscore'
import filesystem from 'fs'
import https from 'https'
import http from 'http'

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
        let conditionTreeController = await new self.extendedSubclass.static['NestedUnitController'](false)
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
            default:
            case 'entrypoint':
                // let argument = {
                //     layoutElement: 'webapp-layout-list'
                // }
                // let mainDocumentElement = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/document-element/document-element.html`, 'utf-8')
                // let mainDocumentElementImport = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/document-element/document-element.import.html`, 'utf-8')
                const templateArgument = {
                    context: this.context,
                    Application,
                    argument: {}
                }
                const view = {
                    metadata: _.template(await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/asset/metadata/metadata.html`, 'utf-8')),
                    header: _.template(await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/entrypoint.js.html`, 'utf-8')),
                    // body: _.template(mainDocumentElement, {Application, argument})
                }
                await this.context.render(
                    `${this.context.instance.config.clientBasePath}/template/root/entrypoint.html`, 
                    Object.assign({}, templateArgument, { view, templateArgument })
                );
                break;
        }
    }

    static createHttpServer() {
        const self = this
        http.createServer(self.serverKoa.callback())
            .listen(self.port, ()=> {
                console.log(`☕%c ${self.name} listening on port ${self.port}`, self.config.style.green)
                // eventEmitter.emit('listening')
                // process.emit('listening')
                if (process.send !== undefined) { // if process is a forked child process.
                    if(self.config.DEPLOYMENT == 'development') process.send({ message: 'Server listening'});
                }
            })
        // eventEmitter.on("listening", function () { console.log("catched listening on same script file"); })
        if(self.config.ssl) {
            let options = {
                key: filesystem.readFileSync('port/webappUI/sampleSSL/server.key'),
                cert: filesystem.readFileSync('port/webappUI/sampleSSL/server.crt')
            }
            https.createServer(options, self.serverKoa.callback())
                .listen(443, () => {
                    console.log(`☕%c ${self.name} listening on port 443`, self.config.style.green)
                })
        }
    }

}

self.initializeStaticClass() // initialize static properties on class.
export default self