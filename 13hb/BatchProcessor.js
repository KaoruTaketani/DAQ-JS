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
                    // console.log(`${key}=${value}`)
                    // resolve()
                    if (p.has('randomNumberGeneratorIsBusy')) {
                        console.log('add once')
                        variables.randomNumberGeneratorIsBusy.addOnceListener(() => {
                            console.log('once')
                            resolve()
                        })
                    } else {
                        console.log('not add once')
                        resolve()
                    }
                })
            ), Promise.resolve())
        }
    }
}

