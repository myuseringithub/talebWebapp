import NestedUnitController from 'class/NestedUnitController.class.js'
import commonMethod from 'class/mixin/commonMethod.mixin.js'
import { mix } from 'mixwith'

const self = class NestedUnitImplementation extends mix(NestedUnitController).with(commonMethod) {

    constructor(skipConstructor = false) {
        super(true)
        if(skipConstructor) return;
        return this
    }

}

export default self