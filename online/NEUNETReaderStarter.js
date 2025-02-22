import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('net').Socket} */
        this._neunertReaderSocket
        variables.neunetReaderSocket.prependListener(arg => { this._neunertReaderSocket = arg })
        /** @type {boolean} */
        this._neunetReaderIsBusy
        variables.neunetReaderIsBusy.addListener(arg => {
            this._neunetReaderIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._neunetReaderIsBusy) return
            
            variables.kickerPulseCount.assign(0)
            this._neunertReaderSocket.connect(23, 'localhost', () => {
                this._neunertReaderSocket.write(Buffer.from([0xa3, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
            })
        }
    }
}

