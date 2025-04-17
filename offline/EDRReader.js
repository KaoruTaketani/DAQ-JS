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
        this._hdf5FileName
        variables.hdf5FileName.prependListener(arg => { this._hdf5FileName = arg })
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.prependListener(arg => { this._filteredTOFHistogram = arg })
        /** @type {import('./index.js').Histogram2D} */
        this._filteredHorizontalProjections
        variables.filteredHorizontalProjections.prependListener(arg => { this._filteredHorizontalProjections = arg })
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
                    variables.filteredHorizontalProjections.assign(this._filteredHorizontalProjections)

                    ready.then(() => {
                        const hdf5File = new File(join(this._hdf5Path, this._hdf5FileName), 'w')
                        variables.hdf5File.assign(hdf5File)
                        hdf5File.close()
                        console.log(`hdf5 elapsedTime: ${Date.now() - startTime} ms`)

                        variables.jsonFilePaths.assign(this._jsonFilePaths)
                    })
                })
        }
    }
}
