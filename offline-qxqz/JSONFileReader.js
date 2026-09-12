import { readFile } from "fs"
import { ready, File } from 'h5wasm/node'
import { basename, join } from 'path'
import Operator from './Operator.js'
import jsonPath from './jsonPath.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._projectName
        variables.projectName.prependListener(arg => { this._projectName = arg })
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {string[]} */
        this._jsonFileNames
        variables.jsonFileNames.addListener(arg => {
            this._jsonFileNames = arg
            this._operation()
        })
        this._operation = () => {
            const name = this._jsonFileNames.shift()
            if (name === undefined) {
                console.log('done')
            } else {
                readFile(join(jsonPath(), this._projectName, name), 'utf8', (err, data) => {
                    if (err) throw err

                    ready.then(() => {
                        variables.startTime.assign(Date.now())

                        variables.kickerIndex.assign(0)
                        variables.neutronCount.assign(0)

                        const parameters = JSON.parse(data)
                        console.log(parameters)
                        variables.hdf5FileName.assign(basename(name, '.json') + '.h5')
                        
                        const f = new File(join(this._hdf5Path, this._projectName, parameters.xytFileName), 'r')
                        variables.xytHDF5File.assign(f)
                        f.close()
                        variables.xytHDF5File

                        variables.parameters.assign(parameters)
                    })
                })
            }
        }
    }
}
