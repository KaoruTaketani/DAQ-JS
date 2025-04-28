import Operator from './Operator.js'
import deg2rad from './deg2rad.js'
import { ok } from 'assert'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._wavelengthInAngstroms
        variables.wavelengthInAngstroms.prependListener(arg => { this._wavelengthInAngstroms = arg })
        /** @type {number} */
        this._incidentAngleInDegrees
        variables.incidentAngleInDegrees.addListener(arg => {
            this._incidentAngleInDegrees = arg
            this._operation()
        })
        this._operation = () => {
            // wavelengths is made by mieze frequency, which is writable
            // and the incident angle is parameter number
            ok(this._wavelengthInAngstroms)

            if(this._incidentAngleInDegrees){
                variables.momentumTransferInInverseAngstroms.assign(
                    this._wavelengthInAngstroms.map(lambda => {
                        /** see @MomentumTransferAmplitude */
                        const theta = deg2rad(this._incidentAngleInDegrees)
    
                        return 4 * Math.PI * Math.sin(theta) / lambda
                    })
                )    
            }else{
                variables.momentumTransferInInverseAngstroms.assign(undefined)
            }
        }
    }
}
