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
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            const startTime = Date.now()
            const Z = peaks(colon(-1, 0.25, 1))

            imwrite(imagesc(Z, [0, 4])).then(buffer => {
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                variables.imageSrc.assign(`data:image/png;base64,${buffer.toString('base64')}`)
            })
        }
    }
}

