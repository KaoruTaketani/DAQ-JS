import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.prependListener(arg => { this._kickerPulseCount = arg })
        /** @type {number} */
        this._channel0Count
        variables.channel0Count.prependListener(arg => { this._channel0Count = arg })
        /** @type {number} */
        this._channel1Count
        variables.channel1Count.prependListener(arg => { this._channel1Count = arg })
        /** @type {Buffer} */
        this._eventBuffer
        variables.eventBuffer.addListener(arg => {
            this._eventBuffer = arg
            this._operation()
        })
        this._operation = () => {
            for (let i = 0; i < this._eventBuffer.length / 8; ++i) {
                if (this._eventBuffer[8 * i] === 0x5a) {
                    const
                        tof = ((this._eventBuffer[8 * i + 1] << 16) + (this._eventBuffer[8 * i + 2] << 8) + this._eventBuffer[8 * i + 3]) * 25, /** time bin is 25 nsec */
                        channel = this._eventBuffer[8 * i + 4] & 0b111,
                        left = (this._eventBuffer[8 * i + 5] << 4) + (this._eventBuffer[8 * i + 6] >> 4),
                        right = ((this._eventBuffer[8 * i + 6] & 0b1111) << 8) + this._eventBuffer[8 * i + 7]

                    if (channel === 0) {
                        variables.channel0Count.assign(this._channel0Count + 1)

                        variables.channel0Event.assign({
                            channel:0,
                            tofInNanoseconds: tof,
                            pulseHeight: left + right,
                            positionInPixels: ((left << 8) / (left + right)) >> 0
                        })
                    }
                    if (channel === 1) {
                        variables.channel1Count.assign(this._channel1Count + 1)

                        variables.channel1Event.assign({
                            channel: 1,
                            tofInNanoseconds: tof,
                            pulseHeight: left + right,
                            positionInPixels: ((left << 8) / (left + right)) >> 0
                        })
                    }
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
