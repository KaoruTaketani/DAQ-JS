import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._histogramTotal
        variables.histogramTotal.addListener(arg => {
            this._histogramTotal = arg
            this._operation()
        })
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            if (this._histogramTotal > 0) return

            variables.histogram.assign({
                lowerEdge: 0,
                upperEdge: 1,
                overflowValue: 0,
                underflowValue: 0,
                numberOfBins: 10,
                value: new Array(10).fill(0)
            })
        }
    }
}
