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
        this._batchProcessorState
        variables.batchProcessorState.addListener(arg => { this._batchProcessorState = arg })
        this._batchProcessorDestinationState
        variables.batchProcessorDestinationState.addListener(arg => {
            this._batchProcessorDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._batchProcessorState === 'idle') {
                if (this._batchProcessorDestinationState === 'busy') {
                    variables.batchProcessorState.assign('busy')
                    Array.from(this._batchParams.entries()).reduce((previous, params) => previous.then(() =>
                        new Promise(resolve => {
                            const [key, value] = params
                            if (this._batchResolve.get(key) === null) {
                                variables.requestParams.assign(new URLSearchParams([params]))
                                resolve()
                            } else {
                                this._batchResolve.set(key, resolve)
                                variables.requestParams.assign(new URLSearchParams([params]))
                            }
                        })
                    ), Promise.resolve()).then(() => {
                        variables.batchProcessorDestinationState.assign('idle')
                    })
                }
                return
            }
            if (this._batchProcessorState === 'busy') {
                if (this._batchProcessorDestinationState === 'idle') {
                    variables.batchProcessorState.assign('idle')
                }
                return
            }
        }
    }
}

