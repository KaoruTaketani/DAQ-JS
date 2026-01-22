export interface ChannelEvent {
    tofInNanoseconds: number
    coordinateInPixels: number
    pulseHeight: number
    channel: number
}

export interface PairedEvent {
    xTOFInNanoseconds: number
    xCoordinateInPixels: number
    xPulseHeight: number
    yTOFInNanoseconds: number
    yCoordinateInPixels: number
    yPulseHeight: number
}

export interface NeutronEvent {
    tofInNanoseconds: number
    xCoordinateInPixels: number
    yCoordinateInPixels: number,
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

export interface Image {
    data: Uint8Array
    width: number
    height: number
}

export interface Histogram {
    binLimits: number[]
    binCounts: Uint32Array
}

export interface Histogram2D {
    xBinLimits: number[]
    yBinLimits: number[]
    binCounts: Uint32Array
    numBins: number[]
}

export interface Histogram3D {
    binCounts: Uint16Array
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

