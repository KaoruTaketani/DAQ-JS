import Operator from '../13/Operator.js'
import imwrite from '../lib/imwrite.js'
import imagesc from '../lib/imagesc.js'
import throttle from '../lib/throttle.js'

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
        this._operation = throttle(() => {
            const startTime = Date.now()
            imwrite(imagesc(this._histogram)).then(buffer => {
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                variables.histogramImageSrc.assign(`data:image/png;base64,${buffer.toString('base64')}`)
            })
        },500)
    }
}

