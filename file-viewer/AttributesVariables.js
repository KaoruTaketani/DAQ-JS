import ClientVariables from './ClientVariables.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        /** @type {import('../lib/ListenableObject.js').default<Map<string,object>>} */
        this.attributes = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.visibleKeys = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.filterValues = new ListenableObject()

        this.visibleInnerHTML = new ListenableString()
        this.theadInnerHTML = new ListenableString()
        this.tbodyInnerHTML = new ListenableString()
        this.linkHref = new ListenableString()
        this.filterKeysInnerHTML = new ListenableString()
        this.filterKey = new ListenableString()
        this.filterValuesInnerHTML = new ListenableString()
    }
}

