export interface ChannelEvent {
    tofInNanoseconds: number
    positionInPixels: number
    pulseHeight: number
    channel: number
}

export interface PairedEvent {
    xTOFInNanoseconds: number
    xPositionInPixels: number
    xPulseHeight: number
    yTOFInNanoseconds: number
    yPositionInPixels: number
    yPulseHeight: number
}

export interface NeutronEvent {
    tofInNanoseconds: number
    xPositionInPixels: number
    yPositionInPixels: number,
    pulseheight: number
}

