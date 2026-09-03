import ListenableString from '../lib/ListenableString.js'

export default class  {
    constructor() {

        this.upstreamSlitToDownstreamSlitDistanceInMeters = new ListenableString()
        this.downstreamSlitToDetectorDistanceInMeters = new ListenableString()

        this.upstreamSlitWidthInMillimeters = new ListenableString()
        this.downstreamSlitWidthInMillimeters = new ListenableString()

        this.tableInnerHTML = new ListenableString()

        this.setupSVGInnerHTML = new ListenableString()
        this.beamSVGInnerHTML = new ListenableString()
    }
}

