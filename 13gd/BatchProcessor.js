import Operator from '../13/Operator.js'
import { ok } from 'assert'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchParams
        variables.batchParams.addListener(arg => { this._batchParams = arg })
        this._batchProcessorState
        variables.batchProcessorState.addListener(arg => { this._batchProcessorState = arg })
        this._batchProcessorDestinationState
        variables.batchProcessorDestinationState.addListener(arg => {
            this._batchProcessorDestinationState = arg
            this._operation()
        })
        this._batchReject
        this._operation = () => {
            if (this._batchProcessorState === 'idle') {
                if (this._batchProcessorDestinationState === 'busy') {
                    variables.batchProcessorState.assign('busy')
                    Array.from(this._batchParams.entries()).reduce((previous, params, index) => previous.then(() =>
                        new Promise((resolve, reject) => {
                            this._batchReject = reject
                            variables.batchIndex.assign(index)
                            variables.batchResolve.assign(resolve)
                            variables.requestParams.assign(new URLSearchParams([params]))
                        })
                    ), Promise.resolve()).then(() => {
                        console.log('finished')
                        variables.batchIndex.assign(-1)
                        variables.batchResolve.assign(undefined)
                        variables.batchProcessorState.assign('idle')
                    }).catch(() => {
                        console.log('stopped')
                        variables.batchIndex.assign(-1)
                        variables.batchResolve.assign(undefined)
                        variables.batchProcessorState.assign('idle')
                    })
                }
            }
            if (this._batchProcessorState === 'busy') {
                if (this._batchProcessorDestinationState === 'idle') {
                    this._batchReject()
                }
            }
        }
    }
}

