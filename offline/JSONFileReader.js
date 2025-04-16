import { readFile } from "fs"
import { basename } from 'path'
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

                    // initializers
                    variables.kickerPulseCount.assign(0)
                    variables.channel0Count.assign(0)
                    variables.channel1Count.assign(0)
                    variables.neutronCount.assign(0)
                    // parameters
                    variables.tofDifferenceMin.assign(-250)
                    variables.tofDifferenceMax.assign(250)
                    variables.moderatorToSampleDistanceInMeters.assign(23.76)
                    variables.cameraLengthInMeters.assign(1.755)
                    variables.detectorHeightInMillimeters.assign(50)
                    variables.detectorWidthInMillimeters.assign(50)
                    variables.upstreamSlitToDownstreamSlitDistanceInMeters.assign(3.5)
                    variables.downstreamSlitToSampleDistanceInMeters.assign(0.3)
                    variables.upstreamSlitWidthInMillimeters.assign(2)
                    variables.downstreamSlitWidthInMillimeters.assign(2)
                    // must assign after distances are assigned
                    variables.miezeFrequencyInKilohertz.assign(10)

                    const parameters = JSON.parse(data)
                    variables.hdf5FileName.assign(basename(path, '.json') + '.h5')
                    variables.directBeamFileName.assign(parameters.directBeamFileName === undefined ? '' : parameters.directBeamFileName)
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
