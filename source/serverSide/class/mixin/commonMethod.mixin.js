import { Mixin } from 'mixwith'

let mixin = Mixin((superclass) => {
    const self = class extends superclass {

        constructor(...args) {
            // mixins should either 1) not define a constructor, 2) require a specific
            // constructor signature, or 3) pass along all arguments.
            super(...args);
        }

        async populateTreeInstanceProperty(conditionTreeJsonData) { // applies json to instance & adds instance 'jsonData' to mark it as instantiated.
            let self = this
            this.populateInstancePropertyFromJson(conditionTreeJsonData)
            self.instance[conditionTreeJsonData.key].jsonData = conditionTreeJsonData
        }

        async populateInstancePropertyFromJson(jsonData) { // creates properties for instance corresponding to the json objects' key-value pairs.
            if(jsonData) {
                Object.entries(jsonData).forEach(
                    ([key, value]) => this[key] = value
                )
            }
        }

        static async createInstance(connection, dataKey, getDocumentQueryCallback) { 
            let self = this
            // [1] Create new instance 
            if(!(dataKey in self.instance)) {
                await new self(dataKey)
            }
            // // [2] Populate properties.
            if(!('jsonData' in self.instance[dataKey])) { // if already populated with data.
                let jsonData = await getDocumentQueryCallback(connection, dataKey)
                await self.instance[dataKey].populateInstancePropertyFromJson(jsonData)
            }
        }

    }
    return self
})

export default mixin