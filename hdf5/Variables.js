import ControllableNumber from './ControllableNumber.js'
import ControllableString from './ControllableString.js'
import ControllableStringArray from './ControllableStringArray.js'
import ElementString from './ElementString.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        /** @type {import('./ListenableObject.js').default<object>} */
        this.message = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<string[]>} */
        this.hdf5FileNames = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<object[]>} */
        this.hdf5Attributes = new ListenableObject()

        this.tableMakerColumns = new ControllableStringArray('tableMakerColumns', this.message)

        this.flightLengthInMeters = new ControllableNumber('flightLengthInMeters', this.message)
        this.tofInMilliseconds = new ControllableNumber('tofInMilliseconds', this.message)

        this.hdf5Path = new ListenableString()

        this.imageSrc = new ElementString('imageSrc', webSocket)
        this.divInnerHTML = new ElementString('divInnerHTML', webSocket)
        this.svgInnerHTML = new ElementString('svgInnerHTML', webSocket)
        this.tableInnerHTML = new ElementString('tableInnerHTML', webSocket)
        this.hdf5FileNamesInnerHTML = new ElementString('hdf5FileNamesInnerHTML', webSocket)
        this.hdf5AttributesInnerHTML = new ElementString('hdf5AttributesInnerHTML', webSocket)
        this.velocityMessageInnerText = new ElementString('velocityMessageInnerText', webSocket)
        this.tofInputValue = new ElementString('tofInputValue',webSocket)
        this.flightLengthInputValue = new ElementString('flightLengthInputValue',webSocket)

        this.hdf5ReaderFileName = new ControllableString('hdf5ReaderFileName', this.message)
    }
}

