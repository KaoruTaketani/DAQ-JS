import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'
import ParameterNumber from './ParameterNumber.js'
import ParameterString from './ParameterString.js'
import WritableHistogram from './WritableHistogram.js'
import WritableHistogram2D from './WritableHistogram2D.js'
import WritableHistogram3D from './WritableHistogram3D.js'
import WritableNumber from './WritableNumber.js'
import WritableNumberArray from './WritableNumberArray.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('worker_threads').MessagePort>} */
        this.tofHistogramPort = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('worker_threads').MessagePort>} */
        this.rawImagePort = new ListenableObject()


        /** @type {import('./ListenableObject.js').default<Uint8Array>} */
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
        this.jsonFilePaths = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').Parameters>} */
        this.parameters = new ListenableObject()

        this.tofHistogram = new WritableHistogram('tofHistogram', this.hdf5File)
        this.pulseHeightHistogram = new WritableHistogram('pulseHeightHistogram', this.hdf5File)
        this.tofDifferenceHistogram = new WritableHistogram('tofDifferenceHistogram', this.hdf5File)
        this.verticalProjection = new WritableHistogram('verticalProjection', this.hdf5File)

        this.rawImage = new WritableHistogram2D('rawImage', this.hdf5File)
        this.filteredImage = new WritableHistogram2D('filteredImage', this.hdf5File)
        this.horizontalProjectionHistograms = new WritableHistogram2D('horizontalProjectionHistograms', this.hdf5File)

        this.tofImage = new WritableHistogram3D('tofImage', this.hdf5File)

        this.neutronPerPulses = new WritableNumberArray('neutronPerPulses', this.hdf5File)
        this.neutronRate = new WritableNumberArray('neutronRate', this.hdf5File)
        this.tofInSeconds = new WritableNumberArray('tofInSeconds', this.hdf5File)
        this.contrast = new WritableNumberArray('contrast', this.hdf5File)
        this.phase = new WritableNumberArray('phase', this.hdf5File)
        this.reflectivity = new WritableNumberArray('reflectivity', this.hdf5File)
        this.contrastRatio = new WritableNumberArray('contrastRatio', this.hdf5File)
        this.phaseShift = new WritableNumberArray('phaseShift', this.hdf5File)
        this.velocityInMetersPerSeconds = new WritableNumberArray('velocityInMetersPerSeconds', this.hdf5File)
        this.energyInMillielectronvolts = new WritableNumberArray('energyInMillielectronvolts', this.hdf5File)
        this.wavelengthInAngstroms = new WritableNumberArray('wavelengthInAngstroms', this.hdf5File)
        this.momentumTransferInInverseAngstroms = new WritableNumberArray('momentumTransferInInverseAngstroms', this.hdf5File)
        this.fourierTimeInPicoseconds = new WritableNumberArray('fourierTimeInPicoseconds', this.hdf5File)
        this.fourierEnergyInMillielectronvolts = new WritableNumberArray('fourierEnergyInMillielectronvolts', this.hdf5File)
        this.heights = new WritableNumberArray('heights', this.hdf5File)
        this.centers = new WritableNumberArray('centers', this.hdf5File)
        this.widths = new WritableNumberArray('widths', this.hdf5File)
        this.horizontalProjectionMeans = new WritableNumberArray('horizontalProjectionMeans', this.hdf5File)
        this.horizontalProjectionStandardDeviations = new WritableNumberArray('horizontalProjectionStandardDeviations', this.hdf5File)

        this.pulseHeightHistogramNumBins = new ListenableNumber()

        this.kickerPulseCount = new WritableNumber('kickerPulseCount', this.hdf5File)
        this.channel0Count = new WritableNumber('channel0Count', this.hdf5File)
        this.channel1Count = new WritableNumber('channel1Count', this.hdf5File)
        this.pairedCount = new WritableNumber('pairedCount', this.hdf5File)
        this.neutronCount = new WritableNumber('neutronCount', this.hdf5File)
        this.filteredNeutronCount = new WritableNumber('filteredNeutronCount', this.hdf5File)
        this.neutronCount = new WritableNumber('neutronCount', this.hdf5File)
        // followings are parameters but fixed
        this.tofMaxInMilliseconds = new WritableNumber('tofMaxInMillioseconds', this.hdf5File)
        this.tofDifferenceMaxInNanoseconds = new WritableNumber('tofDiffrenceMaxInNanoseconds', this.hdf5File)
        this.tofDifferenceMinInNanoseconds = new WritableNumber('tofDiffrenceMinInNanoseconds', this.hdf5File)
        this.tofDifferenceHistogramMaxInNanoseconds = new WritableNumber('tofDiffrenceHistogramMaxInNanoseconds', this.hdf5File)
        this.tofDifferenceHistogramMinInNanoseconds = new WritableNumber('tofDiffrenceHistogramMinInNanoseconds', this.hdf5File)
        this.miezeFrequencyInKilohertz = new WritableNumber('miezeFrequencyInKilohertz', this.hdf5File)
        this.moderatorToSampleDistanceInMeters = new WritableNumber('moderatorToSampleDistanceInMeters', this.hdf5File)
        this.upstreamSlitToDownstreamSlitDistanceInMeters = new WritableNumber('upstreamSlitToDownstreamSlitDistanceInMeters', this.hdf5File)
        this.downstreamSlitToSampleDistanceInMeters = new WritableNumber('downstreamSlitToSampleDistanceInMeters', this.hdf5File)
        this.upstreamSlitWidthInMillimeters = new WritableNumber('upstreamSlitWidthInMillimeters', this.hdf5File)
        this.downstreamSlitWidthInMillimeters = new WritableNumber('downstreamSlitWidthInMillimeters', this.hdf5File)
        this.cameraLengthInMeters = new WritableNumber('cameraLengthInMeters', this.hdf5File)
        this.neutronPositionMaxInMillimeters = new WritableNumber('neutronPositionMaxInMillimeters', this.hdf5File)
        this.neutronPositionBitLength = new WritableNumber('neutronPositionBitLength', this.hdf5File)

        this.roiXInPixels = new ParameterNumber('roiXInPixels', this.hdf5File, this.parameters)
        this.roiYInPixels = new ParameterNumber('roiYInPixels', this.hdf5File, this.parameters)
        this.roiWidthInPixels = new ParameterNumber('roiWidthInPixels', this.hdf5File, this.parameters)
        this.roiHeightInPixels = new ParameterNumber('roiHeightInPixels', this.hdf5File, this.parameters)
        this.incidentAngleInDegrees = new ParameterNumber('incidentAngleInDegrees', this.hdf5File, this.parameters)
        this.frequencyVectorLength = new ParameterNumber('frequencyVectorLength', this.hdf5File, this.parameters)

        this.hdf5FileName = new ListenableString()
        this.hdf5Path = new ListenableString()

        this.comment = new ParameterString('comment', this.hdf5File, this.parameters)
        this.upstreamFlipperOutput = new ParameterString('upstreamFlipperOutput', this.hdf5File, this.parameters)
        this.downstreamFlipperOutput = new ParameterString('downstreamFlipperOutput', this.hdf5File, this.parameters)
        this.directBeamFileName = new ParameterString('directBeamFileName', this.hdf5File, this.parameters)
        /// edrFilePath must be the final listener
        this.edrFilePath = new ParameterString('edrFilePath', this.hdf5File, this.parameters)
    }
}
