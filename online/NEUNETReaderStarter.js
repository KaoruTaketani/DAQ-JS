import { createWriteStream } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('worker_threads').Worker} */
        this._neunetReaderWorker
        variables.neunetReaderWorker.prependListener(arg => { this._neunetReaderWorker = arg })
        /** @type {import('net').Socket} */
        this._neunertReaderSocket
        variables.neunetReaderSocket.prependListener(arg => { this._neunertReaderSocket = arg })
        /** @type {string} */
        this._edrFilePath
        variables.edrFilePath.prependListener(arg => { this._edrFilePath = arg })
        /** @type {boolean} */
        this._saveToEDR
        variables.saveToEDR.prependListener(arg => { this._saveToEDR = arg })
        /** @type {boolean} */
        this._neunetReaderIsBusy
        variables.neunetReaderIsBusy.addListener(arg => {
            this._neunetReaderIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._neunetReaderIsBusy) return

            if (this._saveToEDR) {
                variables.edrStream.assign(createWriteStream(this._edrFilePath))
            }

            variables.kickerPulseCount.assign(0)
            variables.channel0Count.assign(0)
            variables.channel1Count.assign(0)
            variables.neutronCount.assign(0)
            variables.image.assign({
                xBinLimits: [0, 256],
                yBinLimits: [0, 256],
                numBins: [256, 256],
                binCounts: new Uint32Array(256 * 256)
            })

            // if use NEUNETReaderDataHandler, commentout folloing line
            // this._neunertReaderSocket.connect(23, 'localhost', () => {
            //     this._neunertReaderSocket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
            // })
            this._neunetReaderWorker.postMessage(true)
        }
    }
}