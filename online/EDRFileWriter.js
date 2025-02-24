import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._saveToEDR
        variables.saveToEDR.prependListener(arg => { this._saveToEDR = arg })
        /** @type {import('fs').WriteStream} */
        this._edrStream
        variables.edrStream.prependListener(arg => { this._edrStream = arg })
        /** @type {Buffer} */
        this._eventBuffer
        variables.eventBuffer.addListener(arg => {
            this._eventBuffer = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._saveToEDR) return

            if (this._eventBuffer.length > 0) {
                const needsNoDrain = this._edrStream.write(this._eventBuffer)
                if (!needsNoDrain) {
                    console.log('the writer needs to waite for a while')
                }
            } else {
                this._edrStream.close()
            }
        }
    }
}
