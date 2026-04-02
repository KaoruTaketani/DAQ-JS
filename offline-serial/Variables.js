import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'
import ParameterArray from './ParameterArray.js'
import ParameterNumber from './ParameterNumber.js'
import ParameterString from './ParameterString.js'
import ReadableDataset from './ReadableDataset.js'
import WritableArray from './WritableArray.js'
import WritableDataset from './WritableDataset.js'
import WritableInt32 from './WritableInt32.js'
import WritableNumber from './WritableNumber.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<Buffer>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channel0Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channel1Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').PairedEvent>} */
        this.pairedEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').NeutronEvent>} */
        this.neutronEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').NeutronEvent>} */
        this.filteredNeutronEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} */
        this.directBeamHDF5File = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').Parameters>} */
        this.parameters = new ListenableObject()

        /** @type {import('./ReadableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.directBeamNeutronRate = new ReadableDataset('neutronRate', this.directBeamHDF5File)
        /** @type {import('./ReadableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.directBeamContrast = new ReadableDataset('contrast', this.directBeamHDF5File)
        /** @type {import('./ReadableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.directBeamPhase = new ReadableDataset('phase', this.directBeamHDF5File)


        // uint32
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.tofHistogramBinCounts = new WritableDataset('tofHistogramBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.pulseHeightHistogramBinCounts = new WritableDataset('pulseHeightHistogramBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.tofDifferenceHistogramBinCounts = new WritableDataset('tofDifferenceHistogramBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.verticalProjectionBinCounts = new WritableDataset('verticalProjectionBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.horizontalProjectionBinCounts = new WritableDataset('horizontalProjectionBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.rawImageBinCounts = new WritableDataset('rawImageBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.filteredImageBinCounts = new WritableDataset('filteredImageBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.horizontalProjectionHistogramsBinCounts = new WritableDataset('horizontalProjectionHistogramsBinCounts', this.hdf5File)

        // uint16
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint16NDArray>} */
        this.tofImage = new WritableDataset('tofImage', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint16NDArray>} */
        this.neutronPerPulses = new WritableDataset('neutronPerPulses', this.hdf5File)

        // float64
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.neutronRate = new WritableDataset('neutronRate', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.tofInSeconds = new WritableDataset('tofInSeconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.contrast = new WritableDataset('contrast', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.phase = new WritableDataset('phase', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.velocityInMetersPerSeconds = new WritableDataset('velocityInMetersPerSeconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.energyInMillielectronvolts = new WritableDataset('energyInMillielectronvolts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.wavelengthInAngstroms = new WritableDataset('wavelengthInAngstroms', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.fourierTimeInPicoseconds = new WritableDataset('fourierTimeInPicoseconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.fourierEnergyInMillielectronvolts = new WritableDataset('fourierEnergyInMillielectronvolts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.heights = new WritableDataset('heights', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.centers = new WritableDataset('centers', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.widths = new WritableDataset('widths', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.horizontalProjectionMeans = new WritableDataset('horizontalProjectionMeans', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.horizontalProjectionStandardDeviations = new WritableDataset('horizontalProjectionStandardDeviations', this.hdf5File)

        // float64|undefined
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray|undefined>} */
        this.reflectivity = new WritableDataset('reflectivity', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray|undefined>} */
        this.contrastRatio = new WritableDataset('contrastRatio', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray|undefined>} */
        this.phaseShift = new WritableDataset('phaseShift', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray|undefined>} */
        this.momentumTransferInInverseAngstroms = new WritableDataset('momentumTransferInInverseAngstroms', this.hdf5File)

        // WritableArray
        // mainly necessary to draw dataset by using proper axis units
        this.tofHistogramBinLimitsInNanoseconds = new WritableArray('tofHistogramBinLimitsInNanoseconds', this.hdf5File)
        this.tofImageZBinLimitsInNanoseconds = new WritableArray('tofImageZBinLimitsInNanoseconds', this.hdf5File)
        this.tofImageXBinLimitsInPixels = new WritableArray('tofImageXBinLimitsInPixels', this.hdf5File)
        this.tofImageYBinLimitsInPixels = new WritableArray('tofImageYBinLimitsInPixels', this.hdf5File)
        this.tofDifferenceHistogramBinLimitsInNanoseconds = new WritableArray('tofDifferenceHistogramBinLimitsInNanoseconds', this.hdf5File)
        this.rawImageXBinLimitsInPixels = new WritableArray('rawImageXBinLimitsInPixels', this.hdf5File)
        this.rawImageYBinLimitsInPixels = new WritableArray('rawImageYBinLimitsInPixels', this.hdf5File)
        this.pulseHeightHistogramBinLimits = new WritableArray('pulseHeightHistogramBinLimits', this.hdf5File)
        this.tofDifferenceLimitsInNanoseconds = new WritableArray('tofDiffrenceLimitsInNanoseconds', this.hdf5File)
        this.horizontalProjectionHistogramsXBinLimitsInPixels = new WritableArray('horizontalProjectionHistogramsXBinLimitsInPixels', this.hdf5File)
        this.horizontalProjectionHistogramsYBinLimitsInNanoseconds = new WritableArray('horizontalProjectionHistogramsYBinLimitsInNanoseconds', this.hdf5File)
        this.filteredImageXBinLimitsInPixels = new WritableArray('filteredImageXBinLimitsInPixels', this.hdf5File)
        this.filteredImageYBinLimitsInPixels = new WritableArray('filteredImageYBinLimitsInPixels', this.hdf5File)

        this.pulseHeightHistogramNumBins = new ListenableNumber()

        this.kickerPulseCount = new WritableInt32('kickerPulseCount', this.hdf5File)
        this.channel0Count = new WritableInt32('channel0Count', this.hdf5File)
        this.channel1Count = new WritableInt32('channel1Count', this.hdf5File)
        this.neutronCount = new WritableInt32('neutronCount', this.hdf5File)
        this.filteredNeutronCount = new WritableInt32('filteredNeutronCount', this.hdf5File)
        // followings are parameters but fixed
        this.tofMaxInMilliseconds = new WritableNumber('tofMaxInMillioseconds', this.hdf5File)
        this.miezeFrequencyInKilohertz = new WritableNumber('miezeFrequencyInKilohertz', this.hdf5File)
        this.moderatorToSampleDistanceInMeters = new WritableNumber('moderatorToSampleDistanceInMeters', this.hdf5File)
        this.upstreamSlitToDownstreamSlitDistanceInMeters = new WritableNumber('upstreamSlitToDownstreamSlitDistanceInMeters', this.hdf5File)
        this.downstreamSlitToSampleDistanceInMeters = new WritableNumber('downstreamSlitToSampleDistanceInMeters', this.hdf5File)
        this.cameraLengthInMeters = new WritableNumber('cameraLengthInMeters', this.hdf5File)
        this.neutronPositionMaxInMillimeters = new WritableNumber('neutronPositionMaxInMillimeters', this.hdf5File)
        this.neutronPositionBitLength = new WritableNumber('neutronPositionBitLength', this.hdf5File)

        this.roiInMillimeters = new ParameterArray('roiInMillimeters', this.hdf5File, this.parameters)
        this.roiInPixels = new ParameterArray('roiInPixels', this.hdf5File, this.parameters)

        this.incidentAngleInDegrees = new ParameterNumber('incidentAngleInDegrees', this.hdf5File, this.parameters)
        this.frequencyVectorLength = new ParameterNumber('frequencyVectorLength', this.hdf5File, this.parameters)
        this.upstreamSlitWidthInMillimeters = new ParameterNumber('upstreamSlitWidthInMillimeters', this.hdf5File, this.parameters)
        this.downstreamSlitWidthInMillimeters = new ParameterNumber('downstreamSlitWidthInMillimeters', this.hdf5File, this.parameters)
        this.sampleTemperatureInKelvins = new ParameterNumber('sampleTemperatureInKelvins', this.hdf5File, this.parameters)

        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()

        this.comment = new ParameterString('comment', this.hdf5File, this.parameters)
        this.upstreamFlipperOutput = new ParameterString('upstreamFlipperOutput', this.hdf5File, this.parameters)
        this.downstreamFlipperOutput = new ParameterString('downstreamFlipperOutput', this.hdf5File, this.parameters)
        this.directBeamFileName = new ParameterString('directBeamFileName', this.hdf5File, this.parameters)
        /// edrFilePath must be the final listener
        this.edrFileName = new ParameterString('edrFileName', this.hdf5File, this.parameters)
    }
}
