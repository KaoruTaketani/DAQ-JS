import { Worker } from 'worker_threads'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.elementValues.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.neunetReaderIsBusy.assign(false)
            variables.usePreset.assign(true)
            variables.preset.assign(10)
            variables.saveToEDR.assign(false)
            variables.kickerPulseCount.assign(0)
            variables.channel0Count.assign(0)
            variables.channel1Count.assign(0)
            variables.neutronCount.assign(0)
            variables.tofDifferenceMax.assign(250)
            variables.tofDifferenceMin.assign(-250)
            // if use NEUNETReaderDataHandler, commentout folloing line
            // variables.neunetReaderSocket.assign(new Socket())
            
            const worker = new Worker('./NEUNETReaderWorker.js')
            worker.on('message', data => {
                variables.eventBuffer.assign(data)
            }).on('online', () => {
                console.log('worker online')
            }).on('exit', exitCode => {
                console.log(`worker exit. exitCode: ${exitCode}`)
            }).on('messageerror', error => {
                console.log(`worker failed deserialization. error: ${error}`)
            }).on('error', err => {
                console.log(err)
            })
            variables.neunetReaderWorker.assign(worker)
        }
    }
}

