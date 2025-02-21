import ListenableObject from './ListenableObject.js'
import { ok } from 'assert'

/**
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} readable 
     */
    constructor(name, readable) {
        super()
        /** @type {string} */
        this._name = name
        readable.addListener(arg => {
            const dataset = /** @type {import('h5wasm').Dataset} */(arg.get(this._name))
            ok(dataset)
            ok(dataset.dtype === '<d')
            this.assign(/** @type {number[]}*/(dataset.value))
        })
    }
}