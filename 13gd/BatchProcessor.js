import Operator from '../13/Operator.js'
import { ok } from 'assert'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchResolve
        variables.batchResolve.addListener(arg => { this._batchResolve = arg })
        this._batchParams
        variables.batchParams.addListener(arg => { this._batchParams = arg })
        this._batchProcessorDestinationState
        variables.batchProcessorDestinationState.addListener(arg => {
            this._batchProcessorDestinationState = arg
            this._operation()
        })
        this._batchReject
        this._state = 'idle'
        this._operation = () => {
            if (this._state === 'idle') {
                if (this._batchProcessorDestinationState === 'busy') {
                    const ng = Array.from(this._batchParams.keys())
                        .filter(key => !this._batchResolve.has(key))
                    if (ng.length > 0) return

                    Array.from(this._batchParams.entries()).reduce((previous, params) => previous.then(() =>
                        new Promise((resolve, reject) => {
                            const [key, value] = params
                            this._batchReject = reject
                            if (this._batchResolve.get(key) === null) {
                                variables.requestParams.assign(new URLSearchParams([params]))
                                resolve()
                            } else {
                                this._batchResolve.set(key, resolve)
                                variables.requestParams.assign(new URLSearchParams([params]))
                            }
                        })
                    ), Promise.resolve()).then(() => {
                        console.log('finished')
                        variables.batchProcessorDestinationState.assign('idle')
                    }).catch(() => {
                        console.log('stopped')
                        variables.batchProcessorDestinationState.assign('idle')
                    })
                    this._state = this._batchProcessorDestinationState
                }
                return
            }
            if (this._state === 'busy') {
                if (this._batchProcessorDestinationState === 'idle') {
                    if (this._batchReject) this._batchReject()

                    this._state = this._batchProcessorDestinationState
                }
                return
            }
        }
    }
}

