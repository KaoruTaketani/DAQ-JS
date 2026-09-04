import ClientVariables from './ClientVariables.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.attributes = new ListenableObject()
        this.visibleKeys = new ListenableObject()

        this.visibleInnerHTML = new ListenableString()
        this.theadInnerHTML = new ListenableString()
        this.tbodyInnerHTML = new ListenableString()
        this.linkHref = new ListenableString()
        this.filterKeysInnerHTML = new ListenableString()
        this.filterKey = new ListenableString()
        this.filterValuesInnerHTML = new ListenableString()
    }
}

