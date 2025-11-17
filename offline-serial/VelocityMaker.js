import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._moderatorToSampleDistanceInMeters
        variables.moderatorToSampleDistanceInMeters.prependListener(arg => { this._moderatorToSampleDistanceInMeters = arg })
        /** @type {number} */
        this._cameraLengthInMeters
        variables.cameraLengthInMeters.prependListener(arg => { this._cameraLengthInMeters = arg })
        /** @type {number[]} */
        this._tofInSeconds
        variables.tofInSeconds.addListener(arg => {
            this._tofInSeconds = arg
            this._operation()
        })
        this._operation = () => {
            variables.velocityInMetersPerSeconds.assign(
                this._tofInSeconds.map(tof => {
                    const l1 = this._moderatorToSampleDistanceInMeters,
                        l2 = this._cameraLengthInMeters
                    return (l1 + l2) / tof
                })
            )
        }
    }
}
