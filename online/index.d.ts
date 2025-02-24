export interface ChannelEvent {
    tof: number
    position: number
    pulse: number
}

export interface PairedEvent {
    xTOF: number
    xPosition: number
    xPulse: number
    yTOF: number
    yPosition: number
    yPulse: number
}

export interface NeutronEvent {
    tof: number
    x: number
    y: number
}

export interface Histogram {
    binLimits: number[]
    binCounts: number[]
}

export interface Histogram2D {
    xBinLimits: number[]
    yBinLimits: number[]
    binCounts: number[]
    numBins: number[]
}

