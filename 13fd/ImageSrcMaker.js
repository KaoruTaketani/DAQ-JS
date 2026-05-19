import Operator from '../13/Operator.js'
import imwrite from '../lib/imwrite.js'
import imagesc from '../lib/imagesc.js'
import peaks from '../lib/peaks.js'
import colon from '../lib/colon.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._isLog
        this._cmax
        variables.cmax.addListener(arg => { this._cmax = arg })
        this._cmin
        variables.cmin.addListener(arg => { this._cmin = arg })
        variables.isLog.addListener(arg => {
            this._isLog = arg
            this._operation()
        })
        this._operation = () => {
            if (this._cmax === undefined) return
            if (this._cmin === undefined) return

            const startTime = Date.now()
            const Z = peaks(colon(-1, 0.25, 1))

            if (this._isLog) {
                imwrite(imagesc({ shape: Z.shape, data: Z.data.map(v => Math.log10(v)) }, [this._cmin, this._cmax].map(v => Math.log10(v)))).then(buffer => {
                    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                    variables.imageSrc.assign(`data:image/png;base64,${buffer.toString('base64')}`)
                })
            } else {
                imwrite(imagesc(Z, [this._cmin, this._cmax])).then(buffer => {
                    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                    variables.imageSrc.assign(`data:image/png;base64,${buffer.toString('base64')}`)
                })
            }
        }
    }
}

