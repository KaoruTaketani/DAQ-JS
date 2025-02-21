export default class {
    constructor() {
        /** @type {((arg:number)=>void)[]} */
        this._listeners = []
    }
    /** @param {(arg:number)=>void} listener */
    addListener(listener) {
        this._listeners.push(listener)
    }
    /** @param {(arg:number)=>void} listener */
    prependListener(listener) {
        this._listeners.unshift(listener)
    }
    /** @param {number} arg */
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
    }
}
