import ListenableString from '../lib/ListenableString.js'

export default class {
    constructor() {

        this.incidentAngleInDegrees = new ListenableString()
        this.cameraLengthInMeters = new ListenableString()
        this.tofMinInMilliseconds = new ListenableString()
        this.tofMaxInMilliseconds = new ListenableString()

        this.substrateScatteringLengthDensityInSquaredReciprocalAngstroms = new ListenableString()
        this.filmScatteringLengthDensityInSquaredReciprocalAngstroms = new ListenableString()
        this.cameraLengthInMeters = new ListenableString()
        this.moderatorToSampleDistanceInMeters = new ListenableString()

        this.qminInReciprocalAngstroms = new ListenableString()
        this.qmaxInReciprocalAngstroms = new ListenableString()
        
        this.svgInnerHTML = new ListenableString()
    }
}

