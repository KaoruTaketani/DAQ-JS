import ListenableNumber from '../lib/ListenableNumber.js'
import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'
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
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').NeutronEvent>} */
        this.filteredNeutronEvent = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('h5wasm').File|undefined>} */
        this.directBeamHDF5File = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('h5wasm').File|undefined>} */
        this.smallAngleHDF5File = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<string[]>} */
        this.jsonFileNames = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<import('../lib/index.js').Parameters>} */
        this.parameters = new ListenableObject()
        /** @type {import('../lib/ListenableObject.js').default<number[]>} */
        this.roiInPixels = new ListenableObject()

        // uint32ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.imageBinCounts = new WritableDataset('imageBinCounts', this.hdf5File, ['x (mm)', 'y (mm)'])
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.filteredImageBinCounts = new WritableDataset('filteredImageBinCounts', this.hdf5File, ['x (mm)', 'y (mm'])
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.tofImageVProjectionBinCounts = new WritableDataset('tofImageVProjectionBinCounts', this.hdf5File, ['tof (ns)', 'x (mm)'])
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint32NDArray>} */
        this.tofImageVProjectionSums = new WritableDataset('tofImageVProjectionSums', this.hdf5File, ['tof (ns)', 'x (mm)'])
        // uint32array
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofHistogramBinCounts = new WritableDataset('tofHistogramBinCounts', this.hdf5File, ['tof (ns)'])
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofHistogramSum = new WritableDataset('tofHistogramSum', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.pulseHeightHistogramBinCounts = new WritableDataset('pulseHeightHistogramBinCounts', this.hdf5File, ['adc value'])
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.tofDifferenceHistogramBinCounts = new WritableDataset('tofDifferenceHistogramBinCounts', this.hdf5File, ['tof (ns)'])
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.imageHProjectionBinCounts = new WritableDataset('imageHProjectionBinCounts', this.hdf5File, ['y (mm)'])
        /** @type {import('./WritableDataset.js').default<Uint32Array>} */
        this.imageVProjectionBinCounts = new WritableDataset('imageVProjectionBinCounts', this.hdf5File, ['x (mm)'])

        // uint16ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Uint16NDArray>} */
        this.tofImageBinCounts = new WritableDataset('tofImageBinCounts', this.hdf5File)

        // float64ndarray
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.tofImageVProjectionContrasts = new WritableDataset('tofImageVProjectionContrasts', this.hdf5File, ['tof (ns)', 'x (mm)'])
        /** @type {import('./WritableDataset.js').default<import('../lib/index.js').Float64NDArray>} */
        this.tofImageVProjectionPhases = new WritableDataset('tofImageVProjectionPhases', this.hdf5File, ['tof (ns)', 'x (mm)'])
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
        this.concatenatedReflectivity = new WritableDataset('concatenatedReflectivity', this.hdf5File)
        /** @type {import('./WritableDataset.js').default<Float64Array|undefined>} */
        this.concatenatedMomentumTransferInReciprocalAngstroms = new WritableDataset('concatenatedMomentumTransferInReciprocalAngstroms', this.hdf5File)
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
        /** @type {import('./ReadableDataset.js').default<Float64Array|undefined>} */
        this.smallAngleReflectivity = new ReadableDataset('reflectivity', this.smallAngleHDF5File)
        /** @type {import('./ReadableDataset.js').default<Float64Array|undefined>} */
        this.smallAngleMomentumTransferInInverseAngstroms = new ReadableDataset('momentumTransferInInverseAngstroms', this.smallAngleHDF5File)

        // WritableArray
        // mainly necessary to draw dataset by using proper axis units
        this.imageVProjectionBinLimitsInMillimeters = new WritableArray('_xlim', this.hdf5File, this.imageVProjectionBinCounts)
        this.imageHProjectionBinLimitsInMillimeters = new WritableArray('_xlim', this.hdf5File, this.imageHProjectionBinCounts)
        this.tofHistogramBinLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofHistogramBinCounts)
        this.tofImageZBinLimitsInNanoseconds = new WritableArray('_zlim', this.hdf5File, this.tofImageBinCounts)
        this.tofImageXBinLimitsInPixels = new WritableArray('_xlim', this.hdf5File, this.tofImageBinCounts)
        this.tofImageYBinLimitsInPixels = new WritableArray('_ylim', this.hdf5File, this.tofImageBinCounts)
        this.tofDifferenceHistogramBinLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofDifferenceHistogramBinCounts)
        this.imageXBinLimitsInMillimeters = new WritableArray('_xlim', this.hdf5File, this.imageBinCounts)
        this.imageYBinLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.imageBinCounts)
        this.pulseHeightHistogramBinLimits = new WritableArray('_xlim', this.hdf5File, this.pulseHeightHistogramBinCounts)
        this.tofImageVProjectionYBinLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.tofImageVProjectionBinCounts)
        this.tofImageVProjectionXBinLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofImageVProjectionBinCounts)
        this.filteredImageXBinLimitsInMillimeters = new WritableArray('_xlim', this.hdf5File, this.filteredImageBinCounts)
        this.filteredImageYBinLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.filteredImageBinCounts)
        this.tofImageVProjectionSumsXLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofImageVProjectionSums)
        this.tofImageVProjectionSumsYLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.tofImageVProjectionSums)
        this.tofImageVProjectionContrastsXLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofImageVProjectionContrasts)
        this.tofImageVProjectionContrastsYLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.tofImageVProjectionContrasts)
        this.tofImageVProjectionPhasesXLimitsInNanoseconds = new WritableArray('_xlim', this.hdf5File, this.tofImageVProjectionPhases)
        this.tofImageVProjectionPhasesYLimitsInMillimeters = new WritableArray('_ylim', this.hdf5File, this.tofImageVProjectionPhases)
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

        this.jsonPath = new ListenableString()
        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.edrPath = new ListenableString()

        this.comment = new ParameterString('comment', this.hdf5File, this.parameters)
        this.upstreamFlipperOutput = new ParameterString('upstreamFlipperOutput', this.hdf5File, this.parameters)
        this.downstreamFlipperOutput = new ParameterString('downstreamFlipperOutput', this.hdf5File, this.parameters)
        this.directBeamFileName = new ParameterString('directBeamFileName', this.hdf5File, this.parameters)
        this.smallAngleFileName = new ParameterString('smallAngleFileName', this.hdf5File, this.parameters)
        /// edrFilePath must be the final listener
        this.edrFileName = new ParameterString('edrFileName', this.hdf5File, this.parameters)
    }
}
