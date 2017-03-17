import AppClass from 'class/App.class.js'
import commonMethod from 'class/mixin/commonMethod.mixin.js'
import { mix } from 'mixwith'

 const self = class Unit extends mix(AppClass).with(commonMethod) {

    constructor(skipConstructor = false) {
        super(true) 
        if(skipConstructor) return;
    }

 }

 export default self