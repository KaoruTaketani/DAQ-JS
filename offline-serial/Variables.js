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
        /** @type {import('./ListenableObject.js').default<number[]>} */
        this.roiInPixels = new ListenableObject()

        // uint32ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.imageBinCounts = new WritableDataset('imageBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.filteredImageBinCounts = new WritableDataset('filteredImageBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.tofImageVProjectionBinCounts = new WritableDataset('tofImageVProjectionBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.tofImageVProjectionSums = new WritableDataset('tofImageVProjectionSums', this.hdf5File)
        // uint32array
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofHistogramBinCounts = new WritableDataset('tofHistogramBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofHistogramSum = new WritableDataset('tofHistogramSum', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.pulseHeightHistogramBinCounts = new WritableDataset('pulseHeightHistogramBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofDifferenceHistogramBinCounts = new WritableDataset('tofDifferenceHistogramBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.imageHProjectionBinCounts = new WritableDataset('imageHProjectionBinCounts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.imageVProjectionBinCounts = new WritableDataset('imageVProjectionBinCounts', this.hdf5File)

        // uint16ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint16NDArray>} */
        this.tofImageBinCounts = new WritableDataset('tofImageBinCounts', this.hdf5File)
        // uint16array
        /** @type {import('./WritableDataset.js').default<Uint16Array>} */
        this.neutronPerPulses = new WritableDataset('neutronPerPulses', this.hdf5File)

        // float64ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.tofImageVProjectionContrasts = new WritableDataset('tofImageVProjectionContrasts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.tofImageVProjectionPhases = new WritableDataset('tofImageVProjectionPhases', this.hdf5File)
        // float64array
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.neutronRate = new WritableDataset('neutronRate', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.tofInMilliseconds = new WritableDataset('tofInMilliseconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.tofHistogramContrast = new WritableDataset('tofHistogramContrast', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.tofHistogramPhase = new WritableDataset('tofHistogramPhase', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.velocityInMetersPerSeconds = new WritableDataset('velocityInMetersPerSeconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.energyInMillielectronvolts = new WritableDataset('energyInMillielectronvolts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.wavenumberInInverseAngstroms = new WritableDataset('wavenumberInInverseAngstroms', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.wavelengthInAngstroms = new WritableDataset('wavelengthInAngstroms', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.fourierTimeInPicoseconds = new WritableDataset('fourierTimeInPicoseconds', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.fourierEnergyInMillielectronvolts = new WritableDataset('fourierEnergyInMillielectronvolts', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.heights = new WritableDataset('heights', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.centers = new WritableDataset('centers', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.widths = new WritableDataset('widths', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.tofImageVProjectionMeans = new WritableDataset('tofImageVProjectionMeans', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array>} */
        this.tofImageVProjectionStandardDeviations = new WritableDataset('tofImageVProjectionStandardDeviations', this.hdf5File)

        // float64array|undefined
        /** @type {import('./WritableDataset.js').default<Float64Array|undefined>} */
        this.reflectivity = new WritableDataset('reflectivity', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array|undefined>} */
        this.tofHistogramContrastRatio = new WritableDataset('tofHistogramContrastRatio', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array|undefined>} */
        this.tofHistogramPhaseShift = new WritableDataset('tofHistogramPhaseShift', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array|undefined>} */
        this.momentumTransferInInverseAngstroms = new WritableDataset('momentumTransferInInverseAngstroms', this.hdf5File)

        // read float64array|undefined
        /** @type {import('./ReadableDataset.js').default<Float64Array|undefined>} */
        this.directBeamNeutronRate = new ReadableDataset('neutronRate', this.directBeamHDF5File)
        /** @type {import('./ReadableDataset.js').default<Float64Array|undefined>} */
        this.directBeamTOFHistogramContrast = new ReadableDataset('tofHistogramContrast', this.directBeamHDF5File)
        /** @type {import('./ReadableDataset.js').default<Float64Array|undefined>} */
        this.directBeamTOFHistogramPhase = new ReadableDataset('tofHistogramPhase', this.directBeamHDF5File)

        // WritableArray
        // mainly necessary to draw dataset by using proper axis units
        this.imageVProjectionBinLimitsInMillimeters = new WritableArray('imageVProjectionBinCounts', 'binLimitsInMillimeters', this.hdf5File)
        this.imageHProjectionBinLimitsInMillimeters = new WritableArray('imageHProjectionBinCounts', 'binLimitsInMillimeters', this.hdf5File)
        this.tofHistogramBinLimitsInNanoseconds = new WritableArray('tofHistogramBinCounts', 'binLimitsInNanoseconds', this.hdf5File)
        this.tofImageZBinLimitsInNanoseconds = new WritableArray('tofImageBinCounts', 'zBinLimitsInNanoseconds', this.hdf5File)
        this.tofImageXBinLimitsInPixels = new WritableArray('tofImageBinCounts', 'xBinLimitsInPixels', this.hdf5File)
        this.tofImageYBinLimitsInPixels = new WritableArray('tofImageBinCounts', 'yBinLimitsInPixels', this.hdf5File)
        this.tofDifferenceHistogramBinLimitsInNanoseconds = new WritableArray('tofDifferenceHistogramBinCounts', 'binLimitsInNanoseconds', this.hdf5File)
        this.imageXBinLimitsInMillimeters = new WritableArray('imageBinCounts', 'xBinLimitsInMillimeters', this.hdf5File)
        this.imageYBinLimitsInMillimeters = new WritableArray('imageBinCounts', 'yBinLimitsInMillimeters', this.hdf5File)
        this.pulseHeightHistogramBinLimits = new WritableArray('pulseHeightHistogramBinCounts', 'binLimits', this.hdf5File)
        this.tofDifferenceLimitsInNanoseconds = new WritableArray('', 'tofDiffrenceLimitsInNanoseconds', this.hdf5File)
        this.tofImageVProjectionYBinLimitsInMillimeters = new WritableArray('tofImageVProjectionBinCounts', 'yBinLimitsInMillimeters', this.hdf5File)
        this.tofImageVProjectionXBinLimitsInNanoseconds = new WritableArray('tofImageVProjectionBinCounts', 'xBinLimitsInNanoseconds', this.hdf5File)
        this.filteredImageXBinLimitsInMillimeters = new WritableArray('filteredImageBinCounts', 'xBinLimitsInMillimeters', this.hdf5File)
        this.filteredImageYBinLimitsInMillimeters = new WritableArray('filteredImageBinCounts', 'yBinLimitsInMillimeters', this.hdf5File)
        this.tofImageVProjectionSumsXLimitsInNanoseconds = new WritableArray('tofImageVProjectionSums', 'xLimitsInNanoseconds', this.hdf5File)
        this.tofImageVProjectionSumsYLimitsInMillimeters = new WritableArray('tofImageVProjectionSums', 'yLimitsInMillimeters', this.hdf5File)
        this.tofImageVProjectionContrastsXLimitsInNanoseconds = new WritableArray('tofImageVProjectionContrasts', 'xLimitsInNanoseconds', this.hdf5File)
        this.tofImageVProjectionContrastsYLimitsInMillimeters = new WritableArray('tofImageVProjectionContrasts', 'yLimitsInMillimeters', this.hdf5File)
        this.tofImageVProjectionPhasesXLimitsInNanoseconds = new WritableArray('tofImageVProjectionPhases', 'xLimitsInNanoseconds', this.hdf5File)
        this.tofImageVProjectionPhasesYLimitsInMillimeters = new WritableArray('tofImageVProjectionPhases', 'yLimitsInMillimeters', this.hdf5File)
        // followings are the attributes in the root folder
        this.cameraImageSizeInMillimeters = new WritableArray('', 'cameraImageSizeInMillimeters', this.hdf5File)
        this.cameraPixelSizeInMillimeters = new WritableArray('', 'cameraPixelSizeInMillimeters', this.hdf5File)

        this.pulseHeightHistogramNumBins = new ListenableNumber()
        this.measurementStartTime = new ListenableNumber()
        this.measurementEndTime = new ListenableNumber()

        this.kickerPulseCount = new WritableInt32('kickerPulseCount', this.hdf5File)
        this.channel0Count = new WritableInt32('channel0Count', this.hdf5File)
        this.channel1Count = new WritableInt32('channel1Count', this.hdf5File)
        this.neutronCount = new WritableInt32('neutronCount', this.hdf5File)
        this.filteredNeutronCount = new WritableInt32('filteredNeutronCount', this.hdf5File)
        // followings are parameters but fixed
        this.tofResolutionInNanoseconds = new WritableNumber('tofResolutionInNanoseconds', this.hdf5File)
        this.tofMaxInMilliseconds = new WritableNumber('tofMaxInMillioseconds', this.hdf5File)
        this.miezeFrequencyInKilohertz = new WritableNumber('miezeFrequencyInKilohertz', this.hdf5File)
        this.moderatorToSampleDistanceInMeters = new WritableNumber('moderatorToSampleDistanceInMeters', this.hdf5File)
        this.upstreamSlitToDownstreamSlitDistanceInMeters = new WritableNumber('upstreamSlitToDownstreamSlitDistanceInMeters', this.hdf5File)
        this.downstreamSlitToSampleDistanceInMeters = new WritableNumber('downstreamSlitToSampleDistanceInMeters', this.hdf5File)
        this.cameraLengthInMeters = new WritableNumber('cameraLengthInMeters', this.hdf5File)
        this.neutronPositionBitLength = new WritableNumber('neutronPositionBitLength', this.hdf5File)
        this.measurementTimeIdealInMinutes = new WritableNumber('measurementTimeIdealInMinutes', this.hdf5File)
        this.measurementTimeRealInMinutes = new WritableNumber('measurementTimeRealInMinutes', this.hdf5File)
        this.imageVProjectionMeanInMillimeters = new WritableNumber('imageVProjectionMeanInMillimeters', this.hdf5File)

        this.roiInMillimeters = new ParameterArray('roiInMillimeters', this.hdf5File, this.parameters)

        this.incidentAngleInDegrees = new ParameterNumber('incidentAngleInDegrees', this.hdf5File, this.parameters)
        this.frequencyVectorLength = new ParameterNumber('frequencyVectorLength', this.hdf5File, this.parameters)
        this.upstreamSlitWidthInMillimeters = new ParameterNumber('upstreamSlitWidthInMillimeters', this.hdf5File, this.parameters)
        this.downstreamSlitWidthInMillimeters = new ParameterNumber('downstreamSlitWidthInMillimeters', this.hdf5File, this.parameters)
        this.sampleTemperatureInKelvins = new ParameterNumber('sampleTemperatureInKelvins', this.hdf5File, this.parameters)

        this.projectName = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.edrPath = new ListenableString()

        this.comment = new ParameterString('comment', this.hdf5File, this.parameters)
        this.upstreamFlipperOutput = new ParameterString('upstreamFlipperOutput', this.hdf5File, this.parameters)
        this.downstreamFlipperOutput = new ParameterString('downstreamFlipperOutput', this.hdf5File, this.parameters)
        this.directBeamFileName = new ParameterString('directBeamFileName', this.hdf5File, this.parameters)
        /// edrFilePath must be the final listener
        this.edrFileName = new ParameterString('edrFileName', this.hdf5File, this.parameters)
    }
}
