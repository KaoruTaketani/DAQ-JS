import ControllableBoolean from '../13/ControllableBoolean.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import Variables from '../13/Variables.js'
import WritableDataset from './WritableDataset.js'
import WritableNumberArray from './WritableNumberArray.js'

export default class extends Variables {
    constructor() {
        super()
        this.hdf5File = new ListenableObject()

        // overwrite defined in ../13/Variables.js
        this.histogramBinLimits = new WritableNumberArray('binLimits', this.hdf5File)
        // overwrite defined in ../13/Variables.js
        this.histogramBinCounts = new WritableDataset('binCounts', this.hdf5File)

        this.hdf5LinkHref = new ElementString('/hdf5LinkHref', this.elementValues, this.webSocketPathnames)
    }
}

