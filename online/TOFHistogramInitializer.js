import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._neunetReaderIsBusy
        variables.neunetReaderIsBusy.addListener(arg => {
            this._neunetReaderIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._neunetReaderIsBusy) return

            variables.tofHistogram.assign({
                binLimits: [0, 1],
                binCounts: new Array(10).fill(0)
            })
        }
    }
}
