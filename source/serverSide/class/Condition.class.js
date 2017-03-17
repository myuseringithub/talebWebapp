import Unit from 'class/Unit.class.js'
import getCondition from 'database/query/getCondition.query.js'

const self = class Condition extends Unit {

    static instance = [] // conditionKey -> { Json data, properties } 

    constructor(conditionKey) {
        super()
        self.instance[conditionKey] = this;
    }
    
    static async checkCondition(connection, conditionKey) {
        // [1] Instance.
        await self.createInstance(connection, conditionKey, getCondition)
        console.log(self.instance['c639cd53-c764-4967-b052-1e1652107923'])
    }
}

export default self