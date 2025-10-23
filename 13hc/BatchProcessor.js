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
        this._batchProcessorIsBusy
        variables.batchProcessorIsBusy.addListener(arg => {
            this._batchProcessorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._batchProcessorIsBusy) return

            this._batchParams.reduce((previous, params) => previous.then(() =>
                new Promise((resolve, reject) => {
                    const p = new URLSearchParams(params)
                    ok(p.size === 1)
                    variables.batchReject.assign(reject)
                    variables.batchResolve.assign(resolve)
                    variables.requestParams.assign(new URLSearchParams(params))
                })
            ), Promise.resolve()).then(() => {
                console.log('finished')
                variables.batchReject.assign(undefined)
                variables.batchResolve.assign(undefined)
                variables.batchProcessorIsBusy.assign(false)
            }).catch(() => {
                console.log('stopped')
                variables.batchReject.assign(undefined)
                variables.batchResolve.assign(undefined)
                variables.batchProcessorIsBusy.assign(false)
            })
        }
    }
}

