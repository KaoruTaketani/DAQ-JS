import { readFile } from "fs"
import { basename } from 'path'
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
                    variables.filteredNeutronCount.assign(0)
                    // parameters not defined in json
                    variables.tofDifferenceMinInNanoseconds.assign(-250)
                    variables.tofDifferenceMaxInNanoseconds.assign(250)
                    variables.moderatorToSampleDistanceInMeters.assign(23.76)
                    variables.cameraLengthInMeters.assign(1.755)
                    variables.neutronPositionMaxInMillimeters.assign(50)
                    variables.upstreamSlitToDownstreamSlitDistanceInMeters.assign(3.5)
                    variables.downstreamSlitToSampleDistanceInMeters.assign(0.3)
                    variables.upstreamSlitWidthInMillimeters.assign(2)
                    variables.downstreamSlitWidthInMillimeters.assign(2)
                    // followings are the triggers for some operators
                    variables.pulseHeightHistogramNumBins.assign(2 ** 10)
                    variables.tofMaxInMilliseconds.assign(80)
                    variables.tofDifferenceHistogramMinInNanoseconds.assign(-400)
                    variables.tofDifferenceHistogramMaxInNanoseconds.assign(400)
                    variables.neutronPositionBitLength.assign(10)
                    variables.miezeFrequencyInKilohertz.assign(10)

                    const parameters = JSON.parse(data)
                    variables.hdf5FileName.assign(basename(path, '.json') + '.h5')

                    variables.directBeamHDF5File.assign(undefined)

                    variables.parameters.assign(parameters)
                })
            }
        }
    }
}
