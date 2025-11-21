import { Worker } from 'worker_threads'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('worker_threads').Worker[]} */
        this._workers
        variables.workers.prependListener(arg => { this._workers = arg })
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
            variables.workers.assign(new Array(1).fill(new Worker('./worker.js')))
            // this._ports = new Map()
            variables.ports.assign(new Map())

            this._workers[0].postMessage(Object.fromEntries(this._ports), Array.from(this._ports.values()))
            // following code throws an error
            // this._worker.postMessage(Object.fromEntries(this._ports))
        }
    }
}
