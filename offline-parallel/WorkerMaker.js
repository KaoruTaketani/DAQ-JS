import Operator from './Operator.js'
import sum from '../lib/sum.js'
import { MessageChannel, Worker } from 'worker_threads'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Histogram} */
        this._verticalProjection
        variables.verticalProjection.prependListener(arg => { this._verticalProjection = arg })
        variables.hdf5Path.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            const tofHistogramChannel = new MessageChannel()
            const rawImageChannel = new MessageChannel()

            this._worker = new Worker('./worker.js', {
            })
            variables.worker.assign(this._worker)
            this._ports = new Map()
            variables.tofHistogramPort.assign(tofHistogramChannel.port2)
            tofHistogramChannel.port2.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
                console.log(`tofHistogram recieved ${sum(message.binCounts)}`)
            })
            // this._worker.postMessage({ tofHistogramPort: tofHistogramChannel.port1 }, [tofHistogramChannel.port1])
            this._ports.set('tofHistogramPort', tofHistogramChannel.port1)

            variables.rawImagePort.assign(rawImageChannel.port2)
            rawImageChannel.port2.on('message', (/** @type import('../lib/index.js').Histogram2D */message) => {
                console.log(`rawImage recieved ${sum(message.binCounts)}`)
            })
            // this._worker.postMessage({ rawImagePort: rawImageChannel.port1 }, [rawImageChannel.port1])
            this._ports.set('rawImagePort', rawImageChannel.port1)

            this._worker.postMessage(Object.fromEntries(this._ports), Array.from(this._ports.values()))
        }
    }
}
