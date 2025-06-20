export default class {
    constructor() {
        /** @type {((arg:boolean)=>void)[]} */
        this._listeners = []
    }
    /** @param {(arg:boolean)=>void} listener */
    addListener(listener) {
        this._listeners.push(listener)
    }
    /** @param {boolean} arg */
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
    }
}
