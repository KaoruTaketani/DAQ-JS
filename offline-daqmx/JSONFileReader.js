import { readFile } from "fs"
import { basename, join } from 'path'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._jsonPath
        variables.jsonPath.prependListener(arg => { this._jsonPath = arg })
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
            const jsonFileName = this._jsonFileNames.shift()
            if (jsonFileName === undefined) {
                console.log('done')
            } else {
                readFile(join(this._jsonPath, jsonFileName), 'utf8', (err, data) => {
                    if (err) throw err

                    const parameters = JSON.parse(data)
                    console.log(parameters)
                    variables.hdf5FileName.assign(`${basename(jsonFileName,'.json')}.h5`)
                    const tmp = basename(parameters.sigbFileName, '.sigb')
                    // console.log(tmp)
                    if (tmp.length === 6) {
                        const HH = tmp.substring(0, 2)
                        const mm = tmp.substring(2, 4)
                        const ss = tmp.substring(4, 6)
                        // const t1 = Date.parse('2015-12-03T00:00:00') / 1000
                        const t1 = Date.parse(`2015-12-03T${HH}:${mm}:${ss}`) / 1000
                        // console.log(t1)
                        variables.startUnixTime.assign(t1)
                    }

                    variables.parameters.assign(parameters)
                })
            }
        }
    }
}
