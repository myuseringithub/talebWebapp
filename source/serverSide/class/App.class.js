import configuration from 'configuration/configuration.export.js' // Load configuration settings.

class App {
    
    constructor() {
        // if (!(this instanceof App)) return new App() // This is used in factory functions not classes.
        this.config = configuration
    }
    // static createInstance() {
    //     return new App()
    // }


}

export default App