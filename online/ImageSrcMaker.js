import image from './image.js'
import max from '../lib/max.js'
import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(1000)
        /** @type {import('../lib/index.js').Histogram2D} */
        this._image
        variables.image.addListener(arg => {
            this._image = arg
            this._throttle()
        })
        this._operation = () => {
            /** @type {import('../lib/index.js').Axes} */
            const ax = {
                xLim: [0, 1], xTick: [0, 1], xTickLabel: ['0', '1'],
                yLim: [0, 1], yTick: [0, 1], yTickLabel: ['0', '1'],                
                zLim: [0, max(this._image.binCounts)]
            }
            image(ax, this._image).then(buf => {
                variables.imageSrc.assign(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }
    }
}
