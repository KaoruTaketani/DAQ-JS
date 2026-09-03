import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.workers.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            const numBins = 80
            variables.tofHistogramWorker.broadcast({
                binCounts: new Array(numBins).fill(0),
                binLimits: [0, numBins * 1_000_000]
            })
            variables.edrFilePath.assign('../../edr20250424/rpmt_run0.edr')
        }
    }
}
