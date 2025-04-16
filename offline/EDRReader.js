import { createReadStream, statSync } from 'fs'
import { File, ready } from 'h5wasm/node'
import { join } from 'path'
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
        /** @type {string} */
        this._directBeamFileName
        variables.directBeamFileName.prependListener(arg => { this._directBeamFileName = arg })
        /** @type {string} */
        this._hdf5FileName
        variables.hdf5FileName.prependListener(arg => { this._hdf5FileName = arg })
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.prependListener(arg => { this._filteredTOFHistogram = arg })
        /** @type {string[]} */
        this._jsonFilePaths
        variables.jsonFilePaths.prependListener(arg => { this._jsonFilePaths = arg })
        /** @type {string} */
        this._edrFilePath
        variables.edrFilePath.addListener(arg => {
            this._edrFilePath = arg
            this._operation()
        })
        this._operation = () => {
            const totalSize = statSync(this._edrFilePath).size,
                startTime = Date.now()
            let processedSize = 0
            createReadStream(this._edrFilePath, { highWaterMark: 32 * 1024 * 1024 })
                .on('data', chunk => {
                    variables.eventBuffer.assign(/** @type {Buffer} */(chunk))
                    processedSize += chunk.length
                    console.log(`processed ${processedSize.toLocaleString()} / ${totalSize.toLocaleString()} bytes`)
                }).on('end', () => {
                    console.log(`edr elapsedTime: ${Date.now() - startTime} ms`)
                    variables.filteredTOFHistogram.assign(this._filteredTOFHistogram)

                    ready.then(() => {
                        if (this._directBeamFileName) {
                            const directBeamHDF5File = new File(join(this._hdf5Path, this._directBeamFileName), 'r')
                            variables.directBeamHDF5File.assign(directBeamHDF5File)
                            directBeamHDF5File.close()
                        } else {
                            // contrastRatio etc are triggered by directBeamHDF5File
                            // but not be cleaned up even when direct beam file name is ''
                            // directBeamContrast:
                            variables.contrastRatio.assign(undefined)
                            // directBeamNeutronRate
                            variables.reflectivity.assign(undefined)
                            // directBeamPhase
                            variables.phaseShift.assign(undefined)                            
                        }

                        const hdf5File = new File(join(this._hdf5Path, this._hdf5FileName), 'w')
                        variables.hdf5File.assign(hdf5File)
                        hdf5File.close()
                        console.log(`hdf5 elapsedTime: ${Date.now() - startTime} ms`)
                        // initialize followings as they trigger some operators
                        // and initialize tof image 4 times
                        variables.roiX.assign(0)
                        variables.roiY.assign(0)
                        variables.roiWidth.assign(0)
                        variables.roiHeight.assign(0)
                        variables.jsonFilePaths.assign(this._jsonFilePaths)
                    })
                })
        }
    }
}
