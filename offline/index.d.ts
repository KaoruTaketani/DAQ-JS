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

export interface Histogram3D {
    xBinLimits: number[]
    yBinLimits: number[]
    zBinLimits: number[]
    numBins: number[]
    binCounts: number[]
}

export interface Axes {
    xLim: number[]
    yLim: number[]
    zLim?: number[]
    xTick: number[]
    yTick: number[]
    xTickLabel: string[]
    yTickLabel: string[]
    parentWidth?: number
    parentHeight?: number
    innerLeft?: number
    innerBottom?: number
    innerWidth?: number
    innerHeight?: number
    xTickLabelGapOffset?: number
    yTickLabelGapOffset?: number
    xScale?: string
    yScale?: string
    zScale?: string
}