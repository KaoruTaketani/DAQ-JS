import { readFile } from "fs"
import { File, ready } from 'h5wasm/node'
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
                readFile(join(jsonPath(), name), 'utf8', (err, data) => {
                    if (err) throw err

                    ready.then(() => {
                        // initializers
                        variables.kickerPulseCount.assign(0)
                        variables.channel0Count.assign(0)
                        variables.channel1Count.assign(0)
                        variables.neutronCount.assign(0)
                        variables.filteredNeutronCount.assign(0)
                        // parameters not defined in json
                        variables.tofDifferenceLimitsInNanoseconds.assign([-250, 250])
                        variables.moderatorToSampleDistanceInMeters.assign(23.76)
                        variables.cameraLengthInMeters.assign(1.755)
                        variables.neutronPositionMaxInMillimeters.assign(50)
                        variables.upstreamSlitToDownstreamSlitDistanceInMeters.assign(3.5)
                        variables.downstreamSlitToSampleDistanceInMeters.assign(0.3)
                        // followings are parameters
                        // variables.upstreamSlitWidthInMillimeters.assign(2)
                        // variables.downstreamSlitWidthInMillimeters.assign(2)
                        // followings are the triggers for some operators
                        variables.pulseHeightHistogramNumBins.assign(2 ** 10)
                        variables.tofMaxInMilliseconds.assign(80)
                        variables.tofDifferenceHistogramBinLimitsInNanoseconds.assign([-400, 400])
                        variables.neutronPositionBitLength.assign(10)
                        variables.miezeFrequencyInKilohertz.assign(10)

                        const parameters = JSON.parse(data)
                        console.log(parameters)
                        variables.hdf5FileName.assign(basename(name, '.json') + '.h5')

                        if (parameters.directBeamFileName) {
                            const directBeamHDF5File = new File(join(this._hdf5Path, parameters.directBeamFileName), 'r')
                            variables.directBeamHDF5File.assign(directBeamHDF5File)
                            directBeamHDF5File.close()
                        } else {
                            variables.directBeamHDF5File.assign(undefined)
                        }
                        variables.parameters.assign(parameters)
                    })
                })
            }
        }
    }
}
