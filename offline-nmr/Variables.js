import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'
import ParameterArray from '../lib/ParameterArray.js'
import ParameterString from '../lib/ParameterString.js'
import WritableDataset from '../lib/WritableDataset.js'
import WritableNumber from '../lib/WritableNumber.js'

export default class {
    constructor() {
        /** @type {import('../lib/ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').Parameters>} */
        this.parameters = new ListenableObject()

        // float64array
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.meanWaveform = new WritableDataset('meanWaveform', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.signal = new WritableDataset('signal', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.background = new WritableDataset('background', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.maskedX = new WritableDataset('maskedX', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.maskedY = new WritableDataset('maskedY', this.hdf5File)

        this.maskLimits = new ParameterArray('maskLimits', this.hdf5File, this.parameters)

        this.signalSum = new WritableNumber('signalSum', this.hdf5File)
        this.startUnixTime = new WritableNumber('startUnixTime', this.hdf5File)

        this.projectName = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.sigbPath = new ListenableString()

        /// sigbFileName must be the final listener
        this.sigbFileName = new ParameterString('sigbFileName', this.hdf5File, this.parameters)
    }
}
