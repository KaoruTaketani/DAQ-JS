import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._randomNumberGeneratorIsBusy) return

            variables.histogram.assign({
                lowerEdge: 0,
                upperEdge: 1,
                overflowValue: 0,
                underflowValue: 0,
                numberOfBins: 10,
                value: new Array(10).fill(0)
            })
            variables.startTime.assign(Date.now())
        }
    }
}
