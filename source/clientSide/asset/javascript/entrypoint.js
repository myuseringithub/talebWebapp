// SZN App global class
{
    // Initialize the window object 'App' That will contain all utility functions and behaviors for the app //
    class App {
        constructor() {
        }
    } 
    // Global Object that handles the app and other stuff.
    window.App = window.App || new App();
    window.App.behavior = window.App.behavior || {}; // polymer behaviors that include functions and properties.
    window.App.mixin = window.App.mixin || {};
    System.import('setting.behavior.js').then((exports)=>{window.App.behavior.setting = exports.default});
    System.import('setting.mixin.js').then((exports)=>{window.App.mixin.setting = exports.default});
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
        console.info('☕ Polyfill webcomponents.')
        let script = document.createElement('script');
        script.async = true;
        script.src = '/asset/webcomponent/bower_components/webcomponentsjs/webcomponents-loader.js';
        script.onload = onload;
        document.head.appendChild(script);
        // load tag 1.0.0-rc.4
        // JSPM Causes `detected as amd but didn't execute correctly.` which needs configuration. Using bower istead.
        // System.import('webcomponentsjs/webcomponents-lite.js')
    } else {
        console.info('☕ Native webcomponents.')
        onload();
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