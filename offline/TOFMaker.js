import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._miezeFrequencyInKilohertz
        variables.miezeFrequencyInKilohertz.addListener(arg => {
            this._miezeFrequencyInKilohertz = arg
            this._operation()
        })
        this._operation = () => {
            const dt = 0.001 / this._miezeFrequencyInKilohertz,
                nbins = 0.08 / dt

            const tof = new Array(nbins).fill(0).map((_, i) => {
                return (i + 0.5) * dt
            })
            variables.tofInSeconds.assign(tof)
        }
    }
}
