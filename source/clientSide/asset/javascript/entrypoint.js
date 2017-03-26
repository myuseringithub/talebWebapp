// SZN App global class
{
    // Initialize the window object 'App' That will contain all utility functions and behaviors for the app //
    class App {
        constructor() {
        }
    } 
    // Global Object that handles the app and other stuff.
    window.App = window.App || new App();
    window.App.module = window.App.module || {}; // polymer behaviors that include functions and properties.
    window.App.behavior = window.App.behavior || {}; // polymer behaviors that include functions and properties.
    System.import('setting.behavior.js').then(exports => window.App.behavior.setting = exports.default);
    // Mixins are not supported curretly by Polymer, and babel as a side effect of hacks created.
    // window.App.mixin = window.App.mixin || {};
    // System.import('setting.mixin.js').then(exports => window.App.mixin.setting = exports.default);

    // class MixinBuilder {  
    //     constructor(superclass) {
    //         this.superclass = superclass;
    //     }

    //     with(...mixins) { 
    //         return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    //     }
    // }
    // window.App.module.Mixin = (superclass) => new MixinBuilder(superclass);   
}

// Polymer settings, Polyfill
{
    // Load Polymer (importing through the bower using the first webcomponent to be imported to the document, which includes `../polymer/polymer.html` import) 
    // NOTE: Problem that it is executed after the below code.
    // System.import('polymer@2.0-preview/polymer.html!')
    // System.import('http://cdn.localhost/asset/webcomponent/bower_components/polymer/polymer.html!')

    // Web performance API
    window.performance && performance.mark && performance.mark('entrypoint.html');

    // Load webcomponentsjs polyfill if browser does not support native Web Components
    let onload = () => {
        // For native Imports, manually fire WebComponentsReady so user code
        // can use the same code path for native and polyfill'd imports.
        if (!window.HTMLImports) {
            document.dispatchEvent(
                new CustomEvent('WebComponentsReady', {bubbles: true})
            );
        }
    };
    let webComponentsSupported = (
        'registerElement' in document
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template')
    );
    if (!webComponentsSupported) {
        console.info('☕ Polyfill webcomponents. Loading webcomponents javascript.')
        let script = document.createElement('script');
        script.async = true;
        script.src = '/asset/webcomponent/bower_components/webcomponentsjs/webcomponents-loader.js';
        script.onload = onload;
        document.head.appendChild(script);
        // load tag 1.0.0-rc.4
        // JSPM Causes `detected as amd but didn't execute correctly.` which needs configuration. Using bower istead.
        // System.import('webcomponentsjs/webcomponents-lite.js')
    } else {
        console.info('☕ Native webcomponents. Dispaching \'WebComponentsReady\' event manually.')
        window.addEventListener('load', () => { // inorder for the event listener to be registered before dispatching it.
            onload();
        })
    }
}
    
// Service Worker
{
    // Load pre-caching Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register(`${window.location.origin}/serviceWorker/service-worker.js`);
        });
    }
}