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

export interface Parameters {
    edrFilePath: string
    comment?: string
    roiXInPixels?: number
    roiYInPixels?: number
    roiWidthInPixels?: number
    roiHeightInPixels?: number
    frequencyVectorLength?: number
}

export interface XY {
    x: number[]
    y: number[]
}

export interface LineOptions {
    color?: string
    lineStyle?: string
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
    binCounts: number[]
    numBins: number[]
    xBinLimits: number[]
    yBinLimits: number[]
    zBinLimits: number[]
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
    xLabelGapOffset?: number
    yLabelGapOffset?: number
    xScale?: string
    yScale?: string
    zScale?: string
}

