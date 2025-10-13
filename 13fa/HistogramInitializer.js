import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGetterIsBusy
        variables.randomNumberGetterIsBusy.addListener(arg => {
            this._randomNumberGetterIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._randomNumberGetterIsBusy) return

            variables.histogram.assign({
                binLimits: [0, 1],
                binCounts: new Array(10).fill(0)
            })
        }
    }
}
