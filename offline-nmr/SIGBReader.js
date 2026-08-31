import { close, open, read, statSync } from 'fs'
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
        this._projectName
        variables.projectName.prependListener(arg => { this._projectName = arg })
        /** @type {string} */
        this._sigbPath
        variables.sigbPath.prependListener(arg => { this._sigbPath = arg })
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {string} */
        this._hdf5FileName
        variables.hdf5FileName.prependListener(arg => { this._hdf5FileName = arg })
        /** @type {string[]} */
        this._jsonFilePaths
        variables.jsonFileNames.prependListener(arg => { this._jsonFilePaths = arg })
        /** @type {string} */
        this._sigbFileName
        variables.sigbFileName.addListener(arg => {
            this._sigbFileName = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._sigbFileName) return

            const sigbFilePath = join(this._sigbPath, this._projectName, this._sigbFileName),
                totalBytes = statSync(sigbFilePath).size,
                startTime = Date.now()
            const numSamples = 501
            const headerBytes = 1024
            const waveformBytes = 8 * numSamples
            const numWaveforms = (totalBytes - headerBytes) / waveformBytes
            const buffer = Buffer.alloc(waveformBytes * numWaveforms)

            open(sigbFilePath, 'r', (err, fd) => {
                if (err) throw err

                read(fd, buffer, { position: headerBytes }, (err, _bytesRead, buffer) => {
                    if (err) throw err

                    close(fd)
                    // const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
                    const view = new DataView(buffer.buffer)
                    const y = new Float64Array(numSamples)

                    for (let i = 0; i < numWaveforms; ++i) {
                        for (let j = 0; j < numSamples; ++j) {
                            y[j] += view.getFloat64(8 * (j + i * numSamples))
                        }
                    }
                    for (let j = 0; j < numSamples; ++j) {
                        y[j] /= numWaveforms
                    }

                    variables.meanWaveform.assign(y)
                    ready.then(() => {
                        const hdf5File = new File(join(this._hdf5Path, this._projectName, this._hdf5FileName), 'w')
                        variables.hdf5File.assign(hdf5File)
                        hdf5File.close()
                        console.log(`hdf5 elapsedTime: ${Date.now() - startTime} ms`)

                        variables.jsonFileNames.assign(this._jsonFilePaths)
                    })
                })
            })
        }
    }
}
