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
        this._zscale
        variables.zscale.addListener(arg => {
            this._zscale = arg
            this._operation()
        })
        this._operation = () => {
            if (this._zscale === 'log') {
                variables.zscaleInnerHTML.assign([
                    `<option selected>log</option>`,
                    `<option>linear</option>`
                ].join('\n'))
            } else {
                variables.zscaleInnerHTML.assign([
                    `<option>log</option>`,
                    `<option selected>linear</option>`
                ].join('\n'))
            }
        }
    }
}

