const settingMixin = (superclass) => class extends superclass {
    static get properties() {
        return {
            setting: {
                location: {
                    routeBasePath: "http://localhost"
                }
            }
        };
    }

    constructor() {
        super()
    }

}

window.settingMixin = settingMixin
export default settingMixin