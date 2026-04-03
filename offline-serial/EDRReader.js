import { createReadStream, statSync } from 'fs'
import { File, ready } from 'h5wasm/node'
import { join } from 'path'
import Operator from './Operator.js'
import edrPath from './edrPath.js'

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
        /** @type {Uint32Array} */
        this._tofHistogramBinCounts
        variables.tofHistogramBinCounts.prependListener(arg => { this._tofHistogramBinCounts = arg })
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._horizontalProjectionHistogramsBinCounts
        variables.horizontalProjectionHistogramsBinCounts.prependListener(arg => { this._horizontalProjectionHistogramsBinCounts = arg })
        /** @type {string[]} */
        this._jsonFilePaths
        variables.jsonFileNames.prependListener(arg => { this._jsonFilePaths = arg })
        /** @type {string} */
        this._edrFileName
        variables.edrFileName.addListener(arg => {
            this._edrFileName = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._edrFileName) return

            const edrFilePath = join(edrPath(), this._edrFileName),
                totalSize = statSync(edrFilePath).size,
                startTime = Date.now()

            let processedSize = 0
            createReadStream(edrFilePath, { highWaterMark: 32 * 1024 * 1024 })
                .on('data', chunk => {
                    variables.eventBuffer.assign(/** @type {Buffer} */(chunk))
                    processedSize += chunk.length
                    console.log(`processed ${processedSize.toLocaleString()} / ${totalSize.toLocaleString()} bytes`)
                }).on('end', () => {
                    console.log(`edr elapsedTime: ${Date.now() - startTime} ms`)
                    variables.tofHistogramBinCounts.assign(this._tofHistogramBinCounts)
                    variables.horizontalProjectionHistogramsBinCounts.assign(this._horizontalProjectionHistogramsBinCounts)

                    ready.then(() => {
                        const hdf5File = new File(join(this._hdf5Path, this._hdf5FileName), 'w')
                        variables.hdf5File.assign(hdf5File)
                        hdf5File.close()
                        console.log(`hdf5 elapsedTime: ${Date.now() - startTime} ms`)

                        variables.jsonFileNames.assign(this._jsonFilePaths)
                    })
                })
        }
    }
}
