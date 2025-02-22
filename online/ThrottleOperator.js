import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {number} delay 
     */
    constructor(delay) {
        super()
        /** @type {boolean} */
        this._isBusy = false
        this._throttle = () => {
            if (this._isBusy) return

            this._isBusy = true
            setTimeout(() => {
                this._isBusy = false
                this._operation()
            }, delay)
        }
    }
}

