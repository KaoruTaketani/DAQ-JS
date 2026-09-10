import { Worker } from 'worker_threads'
import { createWriteStream } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Waveform} */
        this._waveform
        variables.waveform.addListener(arg => { this._waveform = arg })
        /** @type {string} */
        this._randomNumberGeneratorDestinationState
        variables.daqmxDestinationState.addListener(arg => {
            this._randomNumberGeneratorDestinationState = arg
            this._operation()
        })
        this._ws
        this._worker
        this._operation = () => {
            if (this._randomNumberGeneratorDestinationState === 'busy') {
                this._ws = createWriteStream('Acq-IntClk-DigRef-Loop.bin')
                this._worker = new Worker('./DAQmxWorker.js')

                this._worker.on('message', data => {
                    console.log(`worker message`)
                    this._ws.write(data)
                    this._waveform.Y.set(data)
                    variables.waveform.assign(this._waveform)
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

