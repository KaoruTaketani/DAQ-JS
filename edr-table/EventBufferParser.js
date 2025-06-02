import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.prependListener(arg => { this._neutronPositionBitLength = arg })
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.prependListener(arg => { this._kickerPulseCount = arg })
        /** @type {Buffer} */
        this._eventBuffer
        variables.eventBuffer.addListener(arg => {
            this._eventBuffer = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._eventBuffer) return

            for (let i = 0; i < this._eventBuffer.length / 8; ++i) {
                if (this._eventBuffer[8 * i] === 0x5a) {
                    const
                        tof = ((this._eventBuffer[8 * i + 1] << 16) + (this._eventBuffer[8 * i + 2] << 8) + this._eventBuffer[8 * i + 3]) * 25, /** time bin is 25 nsec */
                        channel = this._eventBuffer[8 * i + 4] & 0b111,
                        left = (this._eventBuffer[8 * i + 5] << 4) + (this._eventBuffer[8 * i + 6] >> 4),
                        right = ((this._eventBuffer[8 * i + 6] & 0b1111) << 8) + this._eventBuffer[8 * i + 7]

                    variables.channelEvent.assign({
                        channel: channel,
                        tofInNanoseconds: tof,
                        pulseHeight: left + right,
                        positionInPixels: Math.floor((left << this._neutronPositionBitLength) / (left + right))
                    })
                } else if (this._eventBuffer[8 * i] === 0x5b) {
                    variables.kickerPulseCount.assign(this._kickerPulseCount + 1)
                } else if (this._eventBuffer[8 * i] === 0x5c) {
                    // timeEvent
                } else {
                    // unexpected
                }
            }
        }
    }
}
