import findpeaks from '../lib/findpeaks.js'
import mean from '../lib/mean.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Waveform} */
        this._waveform
        variables.waveform.addListener(arg => {
            this._waveform = arg
            this._operation()
        })
        this._operation = () => {
            const [y, pos] = findpeaks(this._waveform.Y)
            // console.log(y)
            // console.log(pos)
            /** @type {number[]} */
            const ids = []
            y.forEach((value, index) => {
                if (value > 0.03) ids.push(index)
            })
            // console.log(ids)
            const peakIds=pos.filter((_, i) => ids.includes(i))
            // console.log(peakIds)
            // console.log(mean(peakIds))
            variables.peakInnerText.assign(`peak: ${mean(peakIds)}`)
        }
    }
}

