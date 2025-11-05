import findpeaks from '../lib/findpeaks.js'
import mean from '../lib/mean.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._operation()
        })
        this._operation = () => {
            const [y, pos] = findpeaks(this._histogram.binCounts)
            // console.log(y)
            // console.log(pos)
            const ids = []
            y.forEach((value, index) => {
                if (value > 0.03) ids.push(index)
            })
            // console.log(ids)
            const peakIds=pos.filter((_, i) => ids.includes(i))
            // console.log(peakIds)
            // console.log(mean(peakIds))
            variables.randomNumberInnerText.assign(`peak: ${mean(peakIds)}`)
        }
    }
}

