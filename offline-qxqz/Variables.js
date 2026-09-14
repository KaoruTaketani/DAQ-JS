import ListenableNumber from '../lib/ListenableNumber.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'
import WritableDataset from './WritableDataset.js'
import WritableArray from './WritableArray.js'
import ReadableArray from './ReadableArray.js'
import ReadableNumber from './ReadableNumber.js'
import ReadableString from './ReadableString.js'

export default class {
    constructor() {
        /** @type {import('../lib/ListenableObject.js').default<Buffer>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channel0Event = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channel1Event = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').PairedEvent>} */
        this.pairedEvent = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').NeutronEvent>} */
        this.neutronEvent = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('h5wasm').File|undefined>} */
        this.xytHDF5File = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').ParametersQXQZ>} */
        this.parameters = new ListenableObject()

        // float64array
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.kickerTiems = new WritableDataset('kickerTimes', this.hdf5File)

        // uint32array
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.neutronCountPerPulses = new WritableDataset('neutronCountPerPulses', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.neutronCountPerPulseHistogramBinCounts = new WritableDataset('neutronCountPerPulseHistogramBinCounts', this.hdf5File, ['neutron per pulse'])

        this.neutronCountPerPulseHistogramBinLimits = new WritableArray('_xlim', this.hdf5File, this.neutronCountPerPulseHistogramBinCounts)

        this.tofDifferenceLimitsInNanoseconds = new ReadableArray('tofDiffrenceLimitsInNanoseconds', this.xytHDF5File)

        this.startTime = new ListenableNumber()
        this.neutronCount = new ListenableNumber()
        this.kickerTime = new ListenableNumber()
        this.kickerIndex = new ListenableNumber()

        this.kickerPulseCount = new ReadableNumber('kickerPulseCount', this.xytHDF5File)
        this.neutronPositionBitLength = new ReadableNumber('neutronPositionBitLength', this.xytHDF5File)
        this.tofMaxInMilliseconds = new ReadableNumber('tofMaxInMillioseconds', this.xytHDF5File)

        this.jsonPath = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.edrPath = new ListenableString()

        this.edrFileName = new ReadableString('edrFileName', this.xytHDF5File)
    }
}
