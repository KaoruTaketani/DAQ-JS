import ClientVariables from './ClientVariables.js'
import ListenableString from './ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.xminValue = new ListenableString()
        this.xmaxValue = new ListenableString()
        this.yminValue = new ListenableString()
        this.ymaxValue = new ListenableString()
        this.xlabel = new ListenableString()
        this.ylabel = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

