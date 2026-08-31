import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'
import ParameterArray from './ParameterArray.js'
import ParameterString from './ParameterString.js'
import WritableDataset from './WritableDataset.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').Parameters>} */
        this.parameters = new ListenableObject()

        // float64array
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.meanWaveform = new WritableDataset('meanWaveform', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.signal = new WritableDataset('signal', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.background = new WritableDataset('background', this.hdf5File)

        this.maskLimits = new ParameterArray('maskLimits', this.hdf5File, this.parameters)

        this.projectName = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.sigbPath = new ListenableString()

        /// sigbFileName must be the final listener
        this.sigbFileName = new ParameterString('sigbFileName', this.hdf5File, this.parameters)
    }
}
