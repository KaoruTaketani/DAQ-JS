import { MessageChannel } from 'worker_threads'
import ListenableObject from './ListenableObject.js'
import sum from '../lib/sum.js'

/** 
 * @template T 
 * @extends ListenableObject<T>
 */
export default class extends ListenableObject {
    /**
     * 
     * @param {string} key 
     * @param {import('./ListenableObject').default<import('worker_threads').Worker[]>} workers
     */
    constructor(key, workers) {
        super()
        this._key = key
        this._channels
        workers.addListener(arg => {
            this._channels = new Array(arg.length).fill(null).map(_ => new MessageChannel())
            this._channels.forEach((channel, index) => {
                channel.port2.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
                    console.log(`${this._key} ${index} recieved ${sum(message.binCounts)}`)
                })
            })
            arg.forEach((worker, index) => {
                worker.postMessage(
                    Object.fromEntries([[this._key, this._channels[index].port1]]),
                    [this._channels[index].port1]
                )
            })
        })
    }
    /**
     * @override
     * @param {*} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._channels.forEach(channel => { channel.port2.postMessage(arg) })
    }
}

