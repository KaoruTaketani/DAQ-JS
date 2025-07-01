export default class {
    constructor() {
        /** @type {boolean} */
        this._isRunning = false
        /** @type {function[]} */
        this._queue = []
    }
    flush() {
        this._queue.splice(0)
    }
    /**
     * @param {function} task 
     */
    push(task) {
        this._queue.push(task)
        this._next()
    }
    _next() {
        while (!this._isRunning && this._queue.length) {
            const task = this._queue.shift()
            if (!task) return
            task(() => {
                this._isRunning = false
                this._next()
            })
            this._isRunning = true
        }
    }
}