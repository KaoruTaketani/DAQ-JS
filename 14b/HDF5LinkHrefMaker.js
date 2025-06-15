import { File, ready } from 'h5wasm/node'
import { readFile } from 'fs'
import { basename } from 'path'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            const startTime = Date.now(),
                file = new File('./histogram.h5', 'w')
            variables.histogramHDF5File.assign(file)
            file.close()

            readFile('./histogram.h5', (err, data) => {
                if (err) throw err

                variables.hdf5LinkHref.assign(`data:application/x-hdf5;base64,${data.toString('base64')}`)                
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
            })
        }
    }
}
