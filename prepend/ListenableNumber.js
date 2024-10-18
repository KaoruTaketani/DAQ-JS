export default class {
    constructor() {
        this._listeners = []
    }
    addListener(listener) {
        this._listeners.push(listener)
    }
    prependListener(listener) {
        this._listeners.unshift(listener)
    }
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
    }
}
