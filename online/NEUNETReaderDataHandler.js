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
            let chunkArray = []

            this._neunertReaderSocket.on('data', chunk => {
                if (chunkArray.length === 0) {
                    eventLength = (chunk[2] << 8) + chunk[3]
                    chunkArray.push(chunk.subarray(4))
                } else {
                    chunkArray.push(chunk)
                }
                totalLength += chunk.length

                if (totalLength === eventLength * 2 + 4) {
                    console.log(`data ${totalLength.toLocaleString()} bytes`)
                    variables.eventBuffer.assign(Buffer.concat(chunkArray))
                    totalLength = 0
                    chunkArray = []

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


