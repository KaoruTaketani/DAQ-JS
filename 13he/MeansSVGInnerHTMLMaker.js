import Operator from '../13/Operator.js'
import axes from '../lib/axes.js'
import bounds from '../lib/bounds.js'
import scatter from '../lib/scatter.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._presets
        variables.presets.addListener(arg => { this._presets = arg })
        this._means
        variables.means.addListener(arg => {
            this._means = arg
            this._operation()
        })
        this._operation = () => {
            const yTick = [0, 0.5, 1],
                xTick = this._presets,
                ax = {
                    xLim: bounds(this._presets),
                    yLim: bounds(yTick),
                    xTick: xTick,
                    yTick: yTick,
                    xTickLabel: xTick.map(x => x.toFixed(0)),
                    yTickLabel: yTick.map(x => x.toFixed(1))
                }
            variables.meansSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'preset'),
                ylabel(ax, 'mean'),
                scatter(ax, this._presets.filter((_, i) => i < this._means.length), this._means),
            ].join(''))
        }
    }
}

