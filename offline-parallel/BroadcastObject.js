import { MessageChannel } from 'worker_threads'
import sum from '../lib/sum.js'

/** 
 * @template T 
 */
export default class {
    /**
     * 
     * @param {string} key 
     * @param {import('./ListenableObject').default<import('worker_threads').Worker[]>} workers
     */
    constructor(key, workers) {
        this._key = key
        this._values
        this._channels
        workers.addListener(arg => {
            this._values = new Array(arg.length).fill(null)
            this._channels = new Array(arg.length).fill(null).map(_ => new MessageChannel())
            this._channels.forEach((channel, index) => {
                channel.port2.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
                    console.log(`${this._key} ${index} recieved ${sum(message.binCounts)}`)
                    this._values[index] = message
                    if (this._values.filter(value => value === null).length == 0) {
                        console.log(`all gathered`)
                    }
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
     * @param {T} arg 
     */
    broadcast(arg) {
        this._channels.forEach(channel => { channel.port2.postMessage(arg) })
    }
}

