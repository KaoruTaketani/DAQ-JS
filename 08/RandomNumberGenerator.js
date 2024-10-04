import Operator from './Operator.js'

export default class extends Operator {
    constructor(randomNumberGeneratorIsBusy,randomNumber) {
        super()
        this._randomNumberGeneratorIsBusy
        randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._interval
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                this._interval = setInterval(() => {
                    randomNumber.assign(Math.random())
                }, 1000)
            } else {
                clearInterval(this._interval)
            }
        }
    }
}

