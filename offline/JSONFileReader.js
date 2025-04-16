import { readFile } from "fs"
import { File, ready } from 'h5wasm/node'
import { basename, join } from 'path'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
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

                    ready.then(() => {
                        // contrastRatio etc are triggered by directBeamHDF5File
                        // but not be cleaned up even when direct beam file name is ''
                        // directBeamContrast:
                        variables.contrastRatio.assign(undefined)
                        // directBeamNeutronRate
                        variables.reflectivity.assign(undefined)
                        // directBeamPhase
                        variables.phaseShift.assign(undefined)


                        // initialize followings as they trigger some operators
                        // and initialize tof image 4 times
                        variables.roiXInPixels.assign(0)
                        variables.roiYInPixels.assign(0)
                        variables.roiWidthInPixels.assign(0)
                        variables.roiHeightInPixels.assign(0)

                        // initializers
                        variables.kickerPulseCount.assign(0)
                        variables.channel0Count.assign(0)
                        variables.channel1Count.assign(0)
                        variables.neutronCount.assign(0)
                        // parameters
                        variables.tofDifferenceMinInNanoseconds.assign(-250)
                        variables.tofDifferenceMaxInNanoseconds.assign(250)
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
                        if (parameters.directBeamFileName !== undefined) {
                            const directBeamHDF5File = new File(join(this._hdf5Path, parameters.directBeamFileName), 'r')
                            variables.directBeamHDF5File.assign(directBeamHDF5File)
                            directBeamHDF5File.close()
                        }
                        variables.comment.assign(parameters.comment)
                        variables.roiXInPixels.assign(parameters.roiX)
                        variables.roiYInPixels.assign(parameters.roiY)
                        variables.roiWidthInPixels.assign(parameters.roiWidth)
                        variables.roiHeightInPixels.assign(parameters.roiHeight)
                        variables.incidentAngleInDegrees.assign(parameters.incidentAngleInDegrees)
                        variables.edrFilePath.assign(parameters.edrFilePath)
                    })
                })
            }
        }
    }
}
