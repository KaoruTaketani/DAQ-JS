import { viOpenDefaultRM, viOpen, viClose } from './ni-visa.js'

export default class {
    constructor() {
        /** @type {number} */
        this._driverSession
        /** @type {number} */
        this._deviceSession
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
            if (!task) {
                viClose(this._deviceSession)
                viClose(this._driverSession)
                this._driverSession = 0
                // this._isRunning = false
                return
            }

            if (!this._driverSession) {
                this._driverSession = viOpenDefaultRM()
                this._deviceSession = viOpen(this._driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')
            }
            // task(this._deviceSession, () => {
            //     this._isRunning = false
            //     this._next()
            // })
            // this._isRunning = true
            task(this._deviceSession)
            this._next()
        }
    }
}