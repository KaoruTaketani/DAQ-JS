import { Worker } from 'worker_threads'
import { availableParallelism } from 'os'
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
        variables.hdf5Path.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            const workers = new Array(availableParallelism()).fill(null)
            workers.forEach((_, index) => {
                const worker = new Worker('./worker.js')
                worker.on('online', () => {
                    workers[index] = worker
                    if (workers.filter(worker => worker === null).length === 0) {

                        console.log(`all workers online. numWorkers: ${availableParallelism()}`)
                        variables.workers.assign(workers)
                    }
                })
            })
        }
    }
}
