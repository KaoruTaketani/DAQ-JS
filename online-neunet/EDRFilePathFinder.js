import { readdir } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._neunetReaderIsBusy
        variables.neunetReaderIsBusy.addListener(arg => {
            this._neunetReaderIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (this._neunetReaderIsBusy) return
            
            readdir('./edr', (err, files) => {
                if (err) throw err

                variables.edrFilePath.assign(`./edr/rpmt_run${files.length + 1}.edr`)
            })
        }
    }
}
