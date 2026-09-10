import axes from '../lib/axes.js'
import colon from '../lib/colon.js'
import line from '../lib/line.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
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
            const xLim = [0, this._waveform.dt * this._waveform.Y.length],
                yTick = [-0.05, 0.0, 0.05],
                ax = {
                    xLim: xLim,
                    yLim: [-0.05, 0.05],
                    xTick: xLim,
                    yTick: yTick,
                    xTickLabel: xLim.map(x => x.toFixed(1)),
                    yTickLabel: yTick.map(x => x.toFixed(1))
                }

            variables.waveformSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'time (msec)'),
                ylabel(ax, 'voltage (volts)'),
                line(ax, colon(0, this._waveform.dt, this._waveform.dt * (this._waveform.Y.length - 1)), this._waveform.Y)
            ].join(''))
        }
    }
}

