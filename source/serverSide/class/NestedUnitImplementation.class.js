import AppClass from 'class/App.class.js'
import commonMethod from 'class/mixin/commonMethod.mixin.js'
import { mix } from 'mixwith'

const self = class NestedUnitImplementation extends mix(AppClass).with(commonMethod) {

    // static defaultPropertyName = {
    //     unit: 'unit',
    //     unitKey: ''

    // }

    constructor(skipConstructor = false) {
        super(true)
        if(skipConstructor) return;
    }

 }

 export default self