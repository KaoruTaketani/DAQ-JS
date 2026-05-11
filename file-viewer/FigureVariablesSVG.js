import ClientVariables from './ClientVariables.js'
import ListenableBoolean from './ListenableBoolean.js'
import ListenableString from './ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.xminDisabled = new ListenableBoolean()
        this.xmaxDisabled = new ListenableBoolean()
        this.yminDisabled = new ListenableBoolean()
        this.ymaxDisabled = new ListenableBoolean()
        this.cminDisabled = new ListenableBoolean()
        this.cmaxDisabled = new ListenableBoolean()
        this.customChecked = new ListenableBoolean()

        this.xminValue = new ListenableString()
        this.xmaxValue = new ListenableString()
        this.yminValue = new ListenableString()
        this.ymaxValue = new ListenableString()
        this.cminValue = new ListenableString()
        this.cmaxValue = new ListenableString()
        this.svgInnerHTML = new ListenableString()
    }
}

