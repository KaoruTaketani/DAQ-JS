/** @template T */
export default class {
    constructor() {
        /** @type {((arg:T)=>void)[]} */
        this._listeners = []
    }
    /** @param {(arg:T)=>void} listener */
    addListener(listener) {
        this._listeners.push(listener)
    }
    /** @param {(arg:T)=>void} listener */
    prependListener(listener) {
        this._listeners.unshift(listener)
    }
    /** @param {T} arg */
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
    }
}
