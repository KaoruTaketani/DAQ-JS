import Operator from './Operator.js'

export default class extends Operator {
    constructor(delay) {
        super()
        this._isBusy = false
        this._throttle = () => {
            if (this._isBusy) return
            console.log(`delay: ${delay}`)
            this._isBusy = true
            setTimeout(() => {
                this._isBusy = false
                this._operation()
            }, delay)
        }
    }
}

