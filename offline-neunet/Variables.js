import ListenableNumber from '../lib/ListenableNumber.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'
import ParameterString from '../lib/ParameterString.js'
import WritableArray from '../lib/WritableArray.js'
import WritableDataset from '../lib/WritableDataset.js'
import WritableNumber from '../lib/WritableNumber.js'

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
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<object>} */
        this.parameters = new ListenableObject()
        
        this.hdf5File = new ListenableObject()

        // uint32ndarray
        /** @type {import('../lib/WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.imageBinCounts = new WritableDataset('imageBinCounts', this.hdf5File, ['x (mm)', 'y (mm)'])
        // uint32array
        /** @type {import('../lib/WritableDataset.js').default<Uint32Array>} */
        this.tofHistogramBinCounts = new WritableDataset('tofHistogramBinCounts', this.hdf5File, ['tof (ns)'])
        /** @type {import('../lib/WritableDataset.js').default<Uint32Array>} */
        this.pulseHeightHistogramBinCounts = new WritableDataset('pulseHeightHistogramBinCounts', this.hdf5File, ['adc value'])
        /** @type {import('../lib/WritableDataset.js').default<Uint32Array>} */
        this.tofDifferenceHistogramBinCounts = new WritableDataset('tofDifferenceHistogramBinCounts', this.hdf5File, ['tof (ns)'])

        // float64array
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.tofInMilliseconds = new WritableDataset('tofInMilliseconds', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.velocityInMetersPerSeconds = new WritableDataset('velocityInMetersPerSeconds', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.energyInMillielectronvolts = new WritableDataset('energyInMillielectronvolts', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
        this.wavenumberInInverseAngstroms = new WritableDataset('wavenumberInInverseAngstroms', this.hdf5File)
        /** @type {import('../lib/WritableDataset.js').default<Float64Array>} */
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

        this.kickerPulseCount = new WritableNumber('kickerPulseCount', this.hdf5File,'<i')
        this.channel0Count = new WritableNumber('channel0Count', this.hdf5File,'<i')
        this.channel1Count = new WritableNumber('channel1Count', this.hdf5File,'<i')
        this.neutronCount = new WritableNumber('neutronCount', this.hdf5File,'<i')
        // followings are parameters but fixed
        this.tofResolutionInNanoseconds = new WritableNumber('tofResolutionInNanoseconds', this.hdf5File)
        this.tofMaxInMilliseconds = new WritableNumber('tofMaxInMillioseconds', this.hdf5File)
        this.tofHistogramBinWidthInMilliseconds = new WritableNumber('miezeFrequencyInKilohertz', this.hdf5File)
        this.moderatorToSampleDistanceInMeters = new WritableNumber('moderatorToSampleDistanceInMeters', this.hdf5File)
        this.cameraLengthInMeters = new WritableNumber('cameraLengthInMeters', this.hdf5File)
        this.neutronPositionBitLength = new WritableNumber('neutronPositionBitLength', this.hdf5File)
        this.measurementTimeIdealInMinutes = new WritableNumber('measurementTimeIdealInMinutes', this.hdf5File)
        this.measurementTimeRealInMinutes = new WritableNumber('measurementTimeRealInMinutes', this.hdf5File)

        this.jsonPath = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.edrPath = new ListenableString()

        /// edrFilePath must be the final listener
        this.edrFileName = new ParameterString('edrFileName', this.hdf5File, this.parameters)
    }
}
