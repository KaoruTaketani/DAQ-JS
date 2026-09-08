export default class {
    constructor() {
        /** @type {((arg:string)=>void)[]} */
        this._listeners = []
    }
    /** @param {(arg:string)=>void} listener */
    addListener(listener) {
        this._listeners.push(listener)
    }
    /** @param {(arg:string)=>void} listener */
    prependListener(listener) {
        this._listeners.unshift(listener)
    }
    /** @param {string} arg */
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
    }
}
