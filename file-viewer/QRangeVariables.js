import ListenableString from './ListenableString.js'

export default class  {
    constructor() {

        this.incidentAngleInDegrees = new ListenableString()
        this.cameraLengthInMeters = new ListenableString()
        this.sampleWidthInMillimeters = new ListenableString()
        this.cameraWidthInMillimeters = new ListenableString()
        this.moderatorToSampleDistanceInMeters = new ListenableString()

        this.tofMinInMilliseconds = new ListenableString()
        this.tofMaxInMilliseconds = new ListenableString()

        this.wavelengthMinInAngstroms = new ListenableString()
        this.wavelengthMaxInAngstroms = new ListenableString()

        this.setupSVGInnerHTML = new ListenableString()
        this.beamSVGInnerHTML = new ListenableString()
    }
}

