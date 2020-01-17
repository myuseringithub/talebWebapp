const mixin = superclass => class extends superclass {
    
    constructor(...args) {
        // mixins should either 1) not define a constructor, 2) require a specific
        // constructor signature, or 3) pass along all arguments.
        super(...args);
    }

    static get properties() {
        return {
            setting: {
                location: {
                    routeBasePath: "http://localhost"
                }
            }
        };
    }

}

// window.settingMixin = settingMixin
export default mixin