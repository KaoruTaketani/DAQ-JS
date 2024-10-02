import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.histogramSVGViewBoxWidth.assign(560)
            variables.histogramSVGViewBoxHeight.assign(420)
        }
    }
}

