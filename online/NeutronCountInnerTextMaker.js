import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
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

