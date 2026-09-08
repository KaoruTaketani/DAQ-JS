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
        /** @type {boolean} */
        this._neunetReaderIsBusy
        variables.neunetReaderIsBusy.addListener(arg => {
            this._neunetReaderIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            
            if (this._neunetReaderIsBusy) return

            if (this._neunetReaderWorker)
                this._neunetReaderWorker.postMessage(false)
        }
    }
}