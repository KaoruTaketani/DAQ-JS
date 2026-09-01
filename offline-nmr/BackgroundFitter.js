import colon from '../lib/colon.js'
import minus from '../lib/minus.js'
import polyfit from '../lib/polyfit.js'
import polyval from '../lib/polyval.js'
import sum from '../lib/sum.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._projectName
        variables.projectName.prependListener(arg => { this._projectName = arg })
        /** @type {string} */
        this._sigbPath
        variables.sigbPath.prependListener(arg => { this._sigbPath = arg })
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {string} */
        this._hdf5FileName
        variables.hdf5FileName.prependListener(arg => { this._hdf5FileName = arg })
        /** @type {string[]} */
        this._jsonFilePaths
        variables.jsonFileNames.prependListener(arg => { this._jsonFilePaths = arg })
        /** @type {number[]} */
        this._maskLimits
        variables.maskLimits.prependListener(arg => { this._maskLimits = arg })
        /** @type {Float64Array} */
        this._meanWaveform
        variables.meanWaveform.addListener(arg => {
            this._meanWaveform = arg
            this._operation()
        })
        this._operation = () => {
            const x = colon(1, this._maskLimits[0])
                .concat(colon(this._maskLimits[1], 501))
            const y = new Array(x.length)
            // console.log(x)
            x.forEach((value, index) => {
                y[index] = this._meanWaveform[value - 1]
            })
            variables.maskedX.assign(new Float64Array(x))
            variables.maskedY.assign(new Float64Array(y))
            // console.log(y)
            const p = polyfit(x, y, 3)
            // console.log(p)
            const background = new Float64Array(polyval(p, colon(1, 501)))
            const signal = new Float64Array(minus(Array.from(this._meanWaveform), Array.from(background)))

            variables.background.assign(background)
            variables.signal.assign(signal)
            variables.signalSum.assign(sum(signal))
        }
    }
}
