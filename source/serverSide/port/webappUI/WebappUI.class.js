import { default as Application } from 'appscript'
import _ from 'underscore'
import filesystem from 'fs'
import https from 'https'
import http from 'http'
const TemplateController = require('appscript/module/template')(Application)
let getTableDocument = {
    generate: require('appscript/utilityFunction/database/query/getTableDocument.query.js'),
    instance: []
}
getTableDocument.instance['template_documentBackend'] = getTableDocument.generate('template_documentBackend')

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
        self.eventEmitter.on('initializationEnd', () => {
            let ClassObject = {}
            ClassObject[`${self.name}`] = self
            self.addStaticSubclassToClassArray(ClassObject)
        })
        super.initializeStaticClass()
        self.port = 80
    }
    constructor(skipConstructor = false) {
        super(true)
        this.config = {} // populated by useragentDetection module.
        if(skipConstructor) return;
        // if (!new.target) console.log(new.target) // not supported by babel
        // if (!(this instanceof WebappUI)) return new WebappUI() // This is used in factory functions not classes.
    }
   
    async applyConditionCallback(next) {
    }

    async handleFunctionMiddleware(filePath) {
        let middleware = await require(`${filePath}`)
        middleware(this.context, this.next)
    }

    async handleTemplateDocument(documentKey) {
        
        let documentObject = await getTableDocument.instance['template_documentBackend'](self.rethinkdbConnection, documentKey)
        // context.instance.config.clientBasePath should be defined using useragentDetection module.
        // NOTE:  documentKey should be received from database and nested unit key retreived from there too.
        // document could have different rules for users etc.. access previlages
        let templateController = await new TemplateController(false, { portAppInstance: this.context.instance })
        let renderedContent = await templateController.initializeNestedUnit({ nestedUnitKey: documentObject.viewNestedUnit })
        this.context.body = renderedContent;

        // // let argument = {
        // //     layoutElement: 'webapp-layout-list'
        // // }
        // // let mainDocumentElement = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/document-element/document-element.html`, 'utf-8')
        // // let mainDocumentElementImport = await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/document-element/document-element.import.html`, 'utf-8')
        
        // // Shared arguments between all templates being rendered
        // const templateArgument = {
        //      templateController,
        //     context: this.context,
        //     Application,
        //     argument: {}
        // }
        
        // const view = {
        //     metadata: _.template(await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/asset/metadata/metadata.html`, 'utf-8')),
        //     header: _.template(await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/entrypoint.js.html`, 'utf-8')),
        //     // body: _.template(mainDocumentElement, {Application, argument})
        // }
        // let template = _.template(await filesystem.readFileSync(`${this.context.instance.config.clientBasePath}/template/root/entrypoint.html`, 'utf-8'))
        // this.context.body = template( 
        //     Object.assign(
        //         {}, 
        //         templateArgument, 
        //         { view, templateArgument }
        //     )
        // )


        // // Using 'context.render' using koa-views that uses consolidate.js as an underlying module.
        // // await this.context.render(
        // //     `${this.context.instance.config.clientBasePath}/template/root/entrypoint.html`, 
        // //     Object.assign({}, templateArgument, { view, templateArgument })
        // // );
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
                .on('connection', (socket) => {
                    socket.setTimeout(120);
                })
                .listen(443, () => {
                    console.log(`☕%c ${self.name} listening on port 443`, self.config.style.green)
                })
        }
    }

}

self.initializeStaticClass() // initialize static properties on class.
export default self