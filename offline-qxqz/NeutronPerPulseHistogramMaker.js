import Operator from './Operator.js'
import std from '../lib/std.js'
import mean from '../lib/mean.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronCount
        variables.neutronCount.prependListener(arg => { this._neutronCount = arg })
        /** @type {number} */
        this._kickerIndex
        variables.kickerIndex.prependListener(arg => { this._kickerIndex = arg })
        /** @type {Uint32Array} */
        this._neutronPerPulses
        variables.neutronPerPulses.addListener(arg => {
            this._neutronPerPulses = arg
            this._operation()
        })
        this._operation = () => {
            //
            // use scott BinWidth, 3.5*std(X(:))*numel(X)^(-1/3), edges = [mean-3*std,mean+3*std]
            //
            // https://jp.mathworks.com/help/matlab/ref/matlab.graphics.chart.primitive.histogram.html
            //
            const mean_ = mean(this._neutronPerPulses)
            const std_ = std(this._neutronPerPulses)
            const scottWidth = 3.5 * std_ * Math.pow(this._neutronPerPulses.length, -1 / 3)
            const width = scottWidth < 1 ? 1 : scottWidth
            const nbins = Math.ceil(6 * std_ / width)
            // console.log(`mean: ${mean_}, std: ${std_}, width: ${width}, nbins: ${nbins}`)
            const value = new Uint32Array(nbins)
            let underflowValue = 0
            let overflowValue = 0

            this._neutronPerPulses.forEach(pulse => {
                const id = Math.floor((pulse - (mean_ - 3 * std_)) / width)
                if (id < 0) {
                    underflowValue++
                } else if (id >= nbins) {
                    overflowValue++
                } else {
                    value[id]++
                }
                // if (id === 2) { console.log(`pulse: ${pulse}, id: ${id}`) }
            })
            variables.neutronPerPulseHistogramBinCounts.assign(value)
            variables.neutronPerPulseHistogramBinLimits.assign([mean_ - 3 * std_, mean_ + 3 * std_])            
        }
    }
}
