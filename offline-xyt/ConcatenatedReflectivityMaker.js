import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Float64Array|undefined} */
        this._lowIncidentAngleReflectivity
        variables.lowIncidentAngleReflectivity.prependListener(arg => { this._lowIncidentAngleReflectivity = arg })
        /** @type {Float64Array|undefined} */
        this._reflectivity
        variables.reflectivity.addListener(arg => {
            this._reflectivity = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._reflectivity) return

            if (!this._lowIncidentAngleReflectivity) {
                variables.concatenatedReflectivity.assign(undefined)
            } else {
                const n1 = this._lowIncidentAngleReflectivity.length
                const n2 = this._reflectivity.length
                const c = new Float64Array(n1 + n2)
                c.set(this._lowIncidentAngleReflectivity)
                c.set(this._reflectivity, n1)
                variables.concatenatedReflectivity.assign(c)
            }
        }
    }
}
