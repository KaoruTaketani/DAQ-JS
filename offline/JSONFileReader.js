import { readFile } from "fs"
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string[]} */
        this._jsonFilePaths
        variables.jsonFilePaths.addListener(arg => {
            this._jsonFilePaths = arg
            this._operation()
        })
        this._operation = () => {
            const path = this._jsonFilePaths.shift()
            if (path === undefined) {
                console.log('done')
            } else {
                readFile(path, 'utf8', (err, data) => {
                    if (err) throw err

                    const parameters = JSON.parse(data)

                    variables.hdf5FilePath.assign(parameters.hdf5FilePath)
                    variables.directBeamHDF5FilePath.assign(parameters.directBeamHDF5FilePath)
                    variables.comment.assign(parameters.comment)
                    variables.roiX.assign(parameters.roiX)
                    variables.roiY.assign(parameters.roiY)
                    variables.roiWidth.assign(parameters.roiWidth)
                    variables.roiHeight.assign(parameters.roiHeight)
                    variables.incidentAngleInDegrees.assign(parameters.incidentAngleInDegrees)
                    variables.edrFilePath.assign(parameters.edrFilePath)
                })
            }
        }
    }
}
