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
     * @param {import('./ListenableObject').default<Map<string,import('worker_threads').MessagePort>[]>} ports 
     */
    constructor(key, ports) {
        super()
        this._key = key
        // this._channels = new Array(2).fill(new MessageChannel())
        // this._channels = [new MessageChannel(), new MessageChannel()]
        this._chanels = new Array(2).fill(null).map(_ => new MessageChannel())
        // this._channels[0].port2.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
        //     console.log(`${this._key} 0 recieved ${sum(message.binCounts)}`)
        // })
        // this._channels[1].port2.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
        //     console.log(`${this._key} 1 recieved ${sum(message.binCounts)}`)
        // })
        this._chanels.forEach((channel, index) => {
            channel.port2.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
                console.log(`${this._key} ${index} recieved ${sum(message.binCounts)}`)
            })
        })
        ports.addListener(arg => {
            // arg[0].set(this._key, this._channels[0].port1)
            // arg[1].set(this._key, this._channels[1].port1)
            this._chanels.forEach((channel, index) => {
                arg[index].set(this._key, channel.port1)
            })
        })
    }
    /**
     * @override
     * @param {*} arg 
     */
    assign(arg) {
        super.assign(arg)
        // this._channels[0].port2.postMessage(arg)
        // this._channels[1].port2.postMessage(arg)
        this._chanels.forEach(channel => { channel.port2.postMessage(arg) })
    }
}

