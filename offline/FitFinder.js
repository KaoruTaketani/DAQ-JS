import colon from './colon.js'
import lsqcurvefit from './lsqcurvefit.js'
import Operator from './Operator.js'
import sum from './sum.js'

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
                const s = this._filteredHorizontalProjections.binCounts.slice(i * numBins[0], i * numBins[0] + numBins[1])
                if (sum(s) < 1000) {
                    // console.log(`${i}, ${sum(s)}`)
                    continue
                }
                // console.log(`${i}, ${s.length}, ${sum(s)}`)
                if (i === 0) {
                    const r = lsqcurvefit('gauss', [1007, 83, 31], colon(1, s.length), s)
                    console.log(`fit s.length: ${s.length}, r: ${r}`)
                }
            }
        }
    }
}
