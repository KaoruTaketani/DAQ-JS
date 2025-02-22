import { Socket } from 'net'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.elementValues.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.neunetReaderIsBusy.assign(false)
            variables.usePreset.assign(true)
            variables.preset.assign(10)
            variables.saveFile.assign(false)
            variables.kickerPulseCount.assign(0)
            variables.channel0Count.assign(0)
            variables.channel1Count.assign(0)
            variables.neutronCount.assign(0)
            variables.tofDifferenceMax.assign(250)
            variables.tofDifferenceMin.assign(-250)
            variables.neunetReaderSocket.assign(new Socket())
        }
    }
}

