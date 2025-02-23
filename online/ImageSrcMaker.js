import imagesc from './imagesc.js'
import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(1000)
        /** @type {import('./index.js').Histogram2D} */
        this._image
        variables.image.addListener(arg => {
            this._image = arg
            this._throttle()
        })
        this._operation = () => {
            imagesc(this._image).then(buf => {
                variables.imageSrc.assign(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }
    }
}
