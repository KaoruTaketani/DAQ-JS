import ClientVariables from './ClientVariables.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()
        this.yDataset = new ListenableObject()
        this.xDataset = new ListenableObject()

        this.dataType = new ListenableString()
        this.keysInnerHTML = new ListenableString()
        this.xminValue = new ListenableString()
        this.xmaxValue = new ListenableString()
        this.yminValue = new ListenableString()
        this.ymaxValue = new ListenableString()
        this.xScale = new ListenableString()
        this.yScale = new ListenableString()
        this.xlabel = new ListenableString()
        this.ylabel = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

