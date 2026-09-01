import { readFile } from "fs"
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

                    const parameters = JSON.parse(data)
                    console.log(parameters)
                    const tmp = basename(name, '.json')
                    variables.hdf5FileName.assign(`${tmp}.h5`)
                    if (tmp.length === 6) {
                        const HH = tmp.substring(0, 2)
                        const mm = tmp.substring(2, 4)
                        const ss = tmp.substring(4, 6)
                        // const t1 = Date.parse('2015-12-03T00:00:00') / 1000
                        const t1 = Date.parse(`2015-12-03T${HH}:${mm}:${ss}`) / 1000
                        variables.startUnixTime.assign(t1)
                    }

                    variables.parameters.assign(parameters)
                })
            }
        }
    }
}
