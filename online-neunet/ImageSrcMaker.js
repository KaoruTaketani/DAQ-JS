import imagesc from '../lib/imagesc.js'
import imwrite from '../lib/imwrite.js'
import throttle from '../lib/throttle.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._image
        variables.image.addListener(arg => {
            this._image = arg
            this._operation()
        })
        this._operation = throttle(() => {
            imwrite(imagesc(this._image)).then(buf => {
                variables.imageSrc.assign(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }, 1000)
    }
}
