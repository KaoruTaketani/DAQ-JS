import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._kickerIndex
        variables.kickerIndex.prependListener(arg => { this._kickerIndex = arg })
        /** @type {Float64Array} */
        this._kickerTimes
        variables.kickerTiems.prependListener(arg => { this._kickerTimes = arg })
        /** @type {number} */
        this._kickerTime
        variables.kickerTime.addListener(arg => {
            this._kickerTime = arg
            this._operation()
        })
        /** @type {number} */
        this._previousCount
        this._operation = () => {
            this._kickerTimes[this._kickerIndex] = this._kickerTime
        }
    }
}
