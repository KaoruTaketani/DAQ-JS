import { Worker } from 'worker_threads'
import { createWriteStream } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => { this._histogram = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._ws
        this._worker
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                this._ws = createWriteStream('Acq-IntClk-DigRef-Loop.bin')
                this._worker = new Worker('./Acq-IntClk-DigRef-Worker.js')

                this._worker.on('message', data => {
                    console.log(`worker message`)
                    this._ws.write(data)
                    this._histogram.binCounts = Array.from(data)
                    variables.histogram.assign(this._histogram)
                }).on('online', () => {
                    console.log('worker online')
                }).on('exit', exitCode => {
                    console.log(`worker exit. exitCode: ${exitCode}`)
                }).on('error', err => {
                    console.log(err)
                }).postMessage(true)
            } else {
                this._worker?.postMessage(false)
                this._ws?.close()
            }
        }
    }
}

