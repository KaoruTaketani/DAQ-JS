export interface XY {
    x: number[]
    y: number[]
}

export interface LineOptions {
    color?: string
    lineStyle?: string
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
    xLabelGapOffset?: number
    yLabelGapOffset?: number
    xScale?: string
    yScale?: string
    zScale?: string
}