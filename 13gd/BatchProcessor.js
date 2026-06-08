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
                    this._batchParams.reduce((previous, params) => previous.then(() =>
                        new Promise((resolve, reject) => {
                            const p = new URLSearchParams(params)
                            ok(p.size === 1)
                            this._batchReject = reject
                            variables.batchResolve.assign(resolve)
                            variables.requestParams.assign(new URLSearchParams(params))
                        })
                    ), Promise.resolve()).then(() => {
                        console.log('finished')
                        this._batchReject = undefined
                        variables.batchResolve.assign(undefined)
                        variables.batchProcessorDestinationState.assign('idle')
                    }).catch(() => {
                        console.log('stopped')
                        this._batchReject = undefined
                        variables.batchResolve.assign(undefined)
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

