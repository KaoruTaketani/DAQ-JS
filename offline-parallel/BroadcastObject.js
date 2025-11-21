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
     * @param {import('./ListenableObject').default<Map<string,import('worker_threads').MessagePort>>} ports 
     */
    constructor(key, ports) {
        super()
        this._key = key
        this._channel = new MessageChannel()
        this._port = this._channel.port2
        this._port.on('message', (/** @type import('../lib/index.js').Histogram */message) => {
            console.log(`tofHistogram recieved ${sum(message.binCounts)}`)
        })
        ports.addListener(arg => {
            arg.set(this._key, this._channel.port1)
        })
    }
    /**
     * @override
     * @param {*} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._port.postMessage(arg)
    }
}

