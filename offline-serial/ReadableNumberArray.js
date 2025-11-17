import ListenableObject from './ListenableObject.js'
import { ok } from 'assert'

/**
 * @extends ListenableObject<number[]|undefined>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     */
    constructor(name, file) {
        super()
        /** @type {string} */
        this._name = name
        file.addListener(arg => {
            if (!arg) {
                super.assign(undefined)
            } else {
                const dataset = /** @type {import('h5wasm').Dataset} */(arg.get(this._name))
                ok(dataset)
                ok(dataset.dtype === '<f')
                super.assign(/** @type {number[]}*/(dataset.value))
            }
        })
    }
}