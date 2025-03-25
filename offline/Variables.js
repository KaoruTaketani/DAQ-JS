import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'
import ReadableNumberArray from './ReadableNumberArray.js'
import WritableHistogram from './WritableHistogram.js'
import WritableHistogram2D from './WritableHistogram2D.js'
import WritableHistogram3D from './WritableHistogram3D.js'
import WritableNumber from './WritableNumber.js'
import WritableNumberArray from './WritableNumberArray.js'
import WritableString from './WritableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<Buffer>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').ChannelEvent>} */
        this.channel0Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').ChannelEvent>} */
        this.channel1Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').PairedEvent>} */
        this.pairedEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').NeutronEvent>} */
        this.neutronEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').NeutronEvent>} */
        this.filteredNeutronEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('h5wasm').File>} */
        this.directBeamHDF5File = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<string[]>} */
        this.jsonFilePaths = new ListenableObject()

        this.directBeamNeutronRate = new ReadableNumberArray('neutronRate', this.directBeamHDF5File)
        this.directBeamContrast = new ReadableNumberArray('contrast', this.directBeamHDF5File)
        this.directBeamPhase = new ReadableNumberArray('phase', this.directBeamHDF5File)

        this.filteredTOFHistogram = new WritableHistogram('filteredTOFHistogram', this.hdf5File)

        this.image = new WritableHistogram2D('image', this.hdf5File)
        this.filteredImage = new WritableHistogram2D('filteredImage', this.hdf5File)

        this.filteredTOFImage = new WritableHistogram3D('filteredTOFImage', this.hdf5File)

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

        this.roiX = new ListenableNumber()
        this.roiY = new ListenableNumber()
        this.roiWidth = new ListenableNumber()
        this.roiHeight = new ListenableNumber()

        this.tofDifferenceMax = new WritableNumber('tofDiffrenceMax', this.hdf5File)
        this.tofDifferenceMin = new WritableNumber('tofDiffrenceMin', this.hdf5File)
        this.kickerPulseCount = new WritableNumber('kickerPulseCount', this.hdf5File)
        this.channel0Count = new WritableNumber('channel0Count', this.hdf5File)
        this.channel1Count = new WritableNumber('channel1Count', this.hdf5File)
        this.pairedCount = new WritableNumber('pairedCount', this.hdf5File)
        this.neutronCount = new WritableNumber('neutronCount', this.hdf5File)
        this.miezeFrequencyInKilohertz = new WritableNumber('miezeFrequencyInKilohertz', this.hdf5File)
        this.moderatorToSampleDistanceInMeters = new WritableNumber('moderatorToSampleDistanceInMeters', this.hdf5File)
        this.upstreamSlitToDownstreamSlitDistanceInMeters = new WritableNumber('upstreamSlitToDownstreamSlitDistanceInMeters', this.hdf5File)
        this.downstreamSlitToSampleDistanceInMeters = new WritableNumber('downstreamSlitToSampleDistanceInMeters', this.hdf5File)
        this.upstreamSlitWidthInMillimeters = new WritableNumber('upstreamSlitWidthInMillimeters', this.hdf5File)
        this.downstreamSlitWidthInMillimeters = new WritableNumber('downstreamSlitWidthInMillimeters', this.hdf5File)
        this.cameraLengthInMeters = new WritableNumber('cameraLengthInMeters', this.hdf5File)
        this.incidentAngleInDegrees = new WritableNumber('incidentAngleInDegrees', this.hdf5File)
        this.detectorHeightInMillimeters = new WritableNumber('detectorHeightInMillimeters', this.hdf5File)
        this.detectorWidthInMillimeters = new WritableNumber('detectorWidthInMillimeters', this.hdf5File)

        this.hdf5FilePath = new ListenableString()

        this.comment = new WritableString('comment', this.hdf5File)
        this.directBeamHDF5FilePath = new WritableString('directBeamHDF5FilePath', this.hdf5File)
        this.edrFilePath = new WritableString('edrFilePath', this.hdf5File)
    }
}
