import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogramYAxisScale
        variables.histogramYAxisScale.addListener(arg => {
            this._histogramYAxisScale = arg
            this._operation()
        })
        this._operation = () => {
            variables.histogramYAxisScaleLogChecked.assign(this._histogramYAxisScale === 'log')
        }
    }
}

