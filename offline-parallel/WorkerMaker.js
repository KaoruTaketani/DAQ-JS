import Operator from './Operator.js'
import sum from '../lib/sum.js'
import { MessageChannel, Worker } from 'worker_threads'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Map<string,import('worker_threads').MessagePort>} */
        this._ports
        variables.ports.prependListener(arg => { this._ports = arg })
        /** @type {import('../lib/index.js').Histogram} */
        this._verticalProjection
        variables.verticalProjection.prependListener(arg => { this._verticalProjection = arg })
        variables.hdf5Path.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            this._worker = new Worker('./worker.js', {
            })
            variables.worker.assign(this._worker)
            // this._ports = new Map()
            variables.ports.assign(new Map())

            this._worker.postMessage(Object.fromEntries(this._ports), Array.from(this._ports.values()))
            // following code throws an error
            // this._worker.postMessage(Object.fromEntries(this._ports))
        }
    }
}
