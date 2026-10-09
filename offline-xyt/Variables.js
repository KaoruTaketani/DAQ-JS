import ListenableNumber from '../lib/ListenableNumber.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'
import ParameterNumber from './ParameterNumber.js'
import ParameterString from './ParameterString.js'
import WritableArray from './WritableArray.js'
import WritableDataset from './WritableDataset.js'
import WritableInt32 from './WritableInt32.js'
import WritableNumber from './WritableNumber.js'

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
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').Parameters>} */
        this.parameters = new ListenableObject()

        // uint32ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.imageBinCounts = new WritableDataset('imageBinCounts', this.hdf5File, ['x (mm)', 'y (mm)'])
        // uint32array
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofHistogramBinCounts = new WritableDataset('tofHistogramBinCounts', this.hdf5File, ['tof (ns)'])
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.pulseHeightHistogramBinCounts = new WritableDataset('pulseHeightHistogramBinCounts', this.hdf5File, ['adc value'])
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofDifferenceHistogramBinCounts = new WritableDataset('tofDifferenceHistogramBinCounts', this.hdf5File, ['tof (ns)'])

        // float64array
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.tofInMilliseconds = new WritableDataset('tofInMilliseconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.velocityInMetersPerSeconds = new WritableDataset('velocityInMetersPerSeconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.energyInMillielectronvolts = new WritableDataset('energyInMillielectronvolts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.wavenumberInInverseAngstroms = new WritableDataset('wavenumberInInverseAngstroms', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.wavelengthInAngstroms = new WritableDataset('wavelengthInAngstroms', this.hdf5File)

        // WritableArray
        // mainly necessary to draw dataset by using proper axis units
        this.tofHistogramBinLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofHistogramBinCounts)
        this.tofDifferenceHistogramBinLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofDifferenceHistogramBinCounts)
        this.imageXBinLimitsInMillimeters = new WritableArray('_xlim', this.hdf5File, this.imageBinCounts)
        this.imageYBinLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.imageBinCounts)
        this.pulseHeightHistogramBinLimits = new WritableArray('_xlim', this.hdf5File, this.pulseHeightHistogramBinCounts)
        // followings are the attributes in the root folder
        this.tofDifferenceLimitsInNanoseconds = new WritableArray('tofDiffrenceLimitsInNanoseconds', this.hdf5File)
        this.cameraImageSizeInMillimeters = new WritableArray('cameraImageSizeInMillimeters', this.hdf5File)
        this.cameraPixelSizeInMillimeters = new WritableArray('cameraPixelSizeInMillimeters', this.hdf5File)

        this.pulseHeightHistogramNumBins = new ListenableNumber()
        this.firstLickerTime = new ListenableNumber()
        this.lastKickerTime = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.kickerPulseCount = new WritableInt32('kickerPulseCount', this.hdf5File)
        this.channel0Count = new WritableInt32('channel0Count', this.hdf5File)
        this.channel1Count = new WritableInt32('channel1Count', this.hdf5File)
        this.neutronCount = new WritableInt32('neutronCount', this.hdf5File)
        // followings are parameters but fixed
        this.tofResolutionInNanoseconds = new WritableNumber('tofResolutionInNanoseconds', this.hdf5File)
        this.tofMaxInMilliseconds = new WritableNumber('tofMaxInMillioseconds', this.hdf5File)
        this.miezeFrequencyInKilohertz = new WritableNumber('miezeFrequencyInKilohertz', this.hdf5File)
        this.moderatorToSampleDistanceInMeters = new WritableNumber('moderatorToSampleDistanceInMeters', this.hdf5File)
        this.cameraLengthInMeters = new WritableNumber('cameraLengthInMeters', this.hdf5File)
        this.neutronPositionBitLength = new WritableNumber('neutronPositionBitLength', this.hdf5File)
        this.measurementTimeIdealInMinutes = new WritableNumber('measurementTimeIdealInMinutes', this.hdf5File)
        this.measurementTimeRealInMinutes = new WritableNumber('measurementTimeRealInMinutes', this.hdf5File)

        this.frequencyVectorLength = new ParameterNumber('frequencyVectorLength', this.hdf5File, this.parameters)

        this.jsonPath = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.edrPath = new ListenableString()

        /// edrFilePath must be the final listener
        this.edrFileName = new ParameterString('edrFileName', this.hdf5File, this.parameters)
    }
}
