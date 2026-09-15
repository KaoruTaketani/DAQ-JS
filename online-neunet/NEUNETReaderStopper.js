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
        this._neunetReaderState
        variables.neunetReaderState.prependListener(arg => { this._neunetReaderState = arg })
        /** @type {string} */
        this._neunetReaderDestinationState
        variables.neunetReaderDestinationState.addListener(arg => {
            this._neunetReaderDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._neunetReaderState === 'idle') return
            if (this._neunetReaderDestinationState === 'busy') return

            variables.neunetReaderState.assign('idle')

            if (this._neunetReaderWorker)
                this._neunetReaderWorker.postMessage(false)
        }
    }
}