export interface Parameters {
    edrFilePath: string
    comment?: string
    roiXInPixels?: number
    roiYInPixels?: number
    roiWidthInPixels?: number
    roiHeightInPixels?: number
    frequencyVectorLength?: number
}
export interface ChannelEvent {
    tofInNanoseconds: number
    positionInPixels: number
    pulseHeight: number
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

export interface Histogram {
    binCounts: number[]
    binWidth: number
}

export interface Histogram2D {
    binCounts: number[]
    numBins: number[]
    binWidth: number[]
}

export interface Histogram3D {
    binCounts: number[]
    numBins: number[]
    binWidth: number[]
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