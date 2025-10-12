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
                new Promise(resolve => {
                    const p = new URLSearchParams(params)
                    ok(p.size === 1)
                    variables.requestParams.assign(new URLSearchParams(params))

                    if (p.has('randomNumberGeneratorIsBusy')) {
                        variables.randomNumberGeneratorIsBusy.addOnceListener(() => {
                            resolve()
                        })
                    } else {
                        resolve()
                    }
                })
            ), Promise.resolve()).then(()=>{
                variables.batchProcessorIsBusy.assign(false)
            })
        }
    }
}

