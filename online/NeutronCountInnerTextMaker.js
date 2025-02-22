import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(200)
        /** @type {number} */
        this._neutronCount
        variables.neutronCount.addListener(arg => {
            this._neutronCount = arg
            this._operation()
        })
        this._operation = () => {
            variables.neutronCountInnerText.assign(`neutron: ${this._neutronCount.toLocaleString()} events`)
        }
    }
}

