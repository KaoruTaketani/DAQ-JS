import colon from './colon.js'
import lsqcurvefit from './lsqcurvefit.js'
import Operator from './Operator.js'
import sum from './sum.js'
import max from './max.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram2D} */
        this._filteredHorizontalProjections
        variables.filteredHorizontalProjections.addListener(arg => {
            this._filteredHorizontalProjections = arg
            this._operation()
        })
        this._operation = () => {
            const numBins = this._filteredHorizontalProjections.numBins
            for (let i = 0; i < numBins[0]; ++i) {
                const s = this._filteredHorizontalProjections.binCounts.slice(i * numBins[1], (i + 1) * numBins[1])
                if (sum(s) < 1000) {
                    // console.log(`${i}, ${sum(s)}`)
                    continue
                }
                // console.log(`${i}, ${s.length}, ${sum(s)}`)
                // if (i === 0) {
                const _mean = sum(s.map((s, i) => s * i)) / sum(s),
                    _std = Math.sqrt(sum(s.map((s, i) => s * (i - _mean) ** 2)) / (sum(s) - 1)),
                    r = lsqcurvefit('gauss', [max(s), _mean, _std], colon(1, s.length), s)
                // console.log(`fit i: ${i}, max: ${max(s)}, mean: ${_mean}, std: ${_std}, s.length: ${s.length}`)
                console.log(`fit i: ${i}, r: ${r}`)
                // }
            }
        }
    }
}
