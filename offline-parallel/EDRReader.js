import { createReadStream, statSync } from 'fs'
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
        /** @type {string[]} */
        this._jsonFilePaths
        variables.jsonFilePaths.prependListener(arg => { this._jsonFilePaths = arg })
        /** @type {string} */
        this._edrFilePath
        variables.edrFilePath.addListener(arg => {
            this._edrFilePath = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._edrFilePath) return

            const totalSize = statSync(this._edrFilePath).size,
                startTime = Date.now()
            let processedSize = 0
            createReadStream(this._edrFilePath, { highWaterMark: 32 * 1024 * 1024 })
                .on('data', chunk => {
                    variables.eventBuffer.assign(/** @type {Buffer} */(chunk))
                    // this._workers[0].postMessage(chunk)
                    // this._workers[1].postMessage(chunk)
                    this._workers.forEach(worker => { worker.postMessage(chunk) })
                    processedSize += chunk.length
                    console.log(`processed ${processedSize.toLocaleString()} / ${totalSize.toLocaleString()} bytes`)
                }).on('end', () => {
                    // this._workers[0].postMessage(Buffer.alloc(0))
                    // this._workers[1].postMessage(Buffer.alloc(0))
                    this._workers.forEach(worker => { worker.postMessage(Buffer.alloc(0)) })
                    console.log(`edr elapsedTime: ${Date.now() - startTime} ms`)
                    // this._worker.terminate()
                })
        }
    }
}
