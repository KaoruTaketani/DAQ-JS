import { createReadStream } from 'fs'
import { File, ready } from 'h5wasm/node'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._directBeamHDF5FilePath
        variables.directBeamHDF5FilePath.prependListener(arg => { this._directBeamHDF5FilePath = arg })
        /** @type {string} */
        this._hdf5FilePath
        variables.hdf5FilePath.prependListener(arg => { this._hdf5FilePath = arg })
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.prependListener(arg => { this._filteredTOFHistogram = arg })
        /** @type {string} */
        this._edrFilePath
        variables.edrFilePath.addListener(arg => {
            this._edrFilePath = arg
            this._operation()
        })
        this._operation = () => {
            const startTime = Date.now()
            createReadStream(this._edrFilePath, { highWaterMark: 128 * 1024 * 1024 })
                .on('data', chunk => {
                    variables.eventBuffer.assign(/** @type {Buffer} */(chunk))
                }).on('end', () => {
                    console.log(`edr elapsedTime: ${Date.now() - startTime} ms`)
                    variables.filteredTOFHistogram.assign(this._filteredTOFHistogram)

                    ready.then(() => {
                        if (this._directBeamHDF5FilePath) {
                            const directBeamHDFFile = new File(this._directBeamHDF5FilePath, 'r')
                            variables.directBeamHDF5File.assign(directBeamHDFFile)
                            directBeamHDFFile.close()
                        }

                        const hdfFile = new File(this._hdf5FilePath, 'w')
                        variables.hdf5File.assign(hdfFile)
                        hdfFile.close()
                        console.log(`hdf5 elapsedTime: ${Date.now() - startTime} ms`)
                    })
                })
        }
    }
}
