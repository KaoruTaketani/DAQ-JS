import ListenableString from './ListenableString.js'

export default class  {
    constructor() {

        this.upstreamSlitToDownstreamSlitDistanceInMeters = new ListenableString()
        this.downstreamSlitToDetectorDistanceInMeters = new ListenableString()

        this.upstreamSlitWidthInMillimeters = new ListenableString()
        this.downstreamSlitWidthInMillimeters = new ListenableString()

        this.svgInnerHTML = new ListenableString()
    }
}

