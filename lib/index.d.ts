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

export interface LineOptions {
    color?: string
    lineStyle?: string
}

export interface Image {
    data: Uint8Array
    width: number
    height: number
}

export interface NDArray {
    shape: number[]
    data: TypedArray
}

export interface Uint16NDArray {
    shape: number[]
    data: Uint16Array
}

export interface Uint32NDArray {
    shape: number[]
    data: Uint32Array
}

export interface Float64NDArray {
    shape: number[]
    data: Float64Array
}

export interface Waveform {
    t0: number // in ms 
    dt: number // in ms
    Y: Float64Array
}

export interface Axes {
    xLim: number[]
    yLim: number[]
    zLim?: number[]
    xTick: number[]
    yTick: number[]
    xTickLabel: string[]
    yTickLabel: string[]
    viewBox?: number[]
    position?: number[]
    xTickLabelGapOffset?: number
    yTickLabelGapOffset?: number
    xLabelGapOffset?: number
    yLabelGapOffset?: number
    xScale?: string
    yScale?: string
    zScale?: string
    yDir?: string
}

export interface MotorSetting {
    device: string
    channel: string
    origin: number
    pulsePerUnit: number
    unit: string
}