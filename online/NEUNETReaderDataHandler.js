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
        /** @type {boolean} */
        this._neunetReaderIsBusy
        variables.neunetReaderIsBusy.prependListener(arg => { this._neunetReaderIsBusy = arg })
        /** @type {import('net').Socket} */
        this._neunertReaderSocket
        variables.neunetReaderSocket.addListener(arg => {
            this._neunertReaderSocket = arg
            this._operation()
        })
        this._operation = () => {
            /** @type {number} */
            let eventLength = 0
            /** @type {number} */
            let totalLength = 0
            /** @type {Uint8Array[]} */
            let eventBuffers = []

            this._neunertReaderSocket.on('data', chunk => {
                if (eventBuffers.length === 0) {
                    eventLength = (chunk[2] << 8) + chunk[3]
                    eventBuffers.push(chunk.subarray(4))
                } else {
                    eventBuffers.push(chunk)
                }
                totalLength += chunk.length

                if (totalLength === eventLength * 2 + 4) {
                    console.log(`data ${totalLength.toLocaleString()} bytes`)
                    eventBuffers.forEach(eventBuffer => {
                        for (let i = 0; i < eventBuffer.length / 8; ++i) {
                            if (eventBuffer[8 * i] === 0x5b) {
                                variables.kickerPulseCount.assign(this._kickerPulseCount + 1)
                            }
                        }
                    })
                    totalLength = 0
                    eventBuffers = []

                    if (this._neunetReaderIsBusy) {
                        this._neunertReaderSocket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
                    } else {
                        this._neunertReaderSocket.end()
                    }
                }
            })
        }
    }
}


