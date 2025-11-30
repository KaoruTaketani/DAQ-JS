import { Worker } from 'worker_threads'
import {availableParallelism} from 'os'
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
        /** @type {import('../lib/index.js').Histogram} */
        this._verticalProjection
        variables.verticalProjection.prependListener(arg => { this._verticalProjection = arg })
        variables.hdf5Path.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            // variables.workers.assign(new Array(2).fill(new Worker('./worker.js')))
            // variables.workers.assign([new Worker('./worker.js'), new Worker('./worker.js')])
            console.log(`numWorkers: ${availableParallelism()}`)
            variables.workers.assign(new Array(availableParallelism()).fill(null).map(_ => new Worker('./worker.js')))
            // this._ports = new Map()
            // variables.ports.assign(new Array(2).fill(new Map()))
            // variables.ports.assign([new Map(), new Map()])
            // variables.ports.assign(new Array(2).fill(null).map(_ => new Map()))

            // this._workers[0].postMessage(Object.fromEntries(this._ports[0]), Array.from(this._ports[0].values()))
            // this._workers[1].postMessage(Object.fromEntries(this._ports[1]), Array.from(this._ports[1].values()))
            // this._workers.forEach((worker, index) => {
            //     worker.postMessage(Object.fromEntries(this._ports[index]), Array.from(this._ports[index].values()))
            // })
            // following code throws an error
            // this._worker.postMessage(Object.fromEntries(this._ports))
        }
    }
}
