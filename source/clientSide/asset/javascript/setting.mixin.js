const settingMixin = (superclass) => class extends superclass {
    static get properties() {
        return {
            setting: {
                location: {
                    routeBasePath: "https://taleb.io"
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