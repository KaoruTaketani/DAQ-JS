import { createReadStream, statSync } from 'fs'
import { join } from 'path'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._processedSize
        variables.processedSize.prependListener(arg => { this._processedSize = arg })
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
        /** @type {string} */
        this._edrReaderFileName
        variables.edrReaderFileName.addListener(arg => {
            this._edrReaderFileName = arg
            this._operation()
        })
        this._operation = () => {
            const filePath = join(this._edrPath, this._edrReaderFileName)

            variables.edrFileSize.assign(statSync(filePath).size)
            variables.processedSize.assign(0)

            variables.channelEvents.assign([])
            variables.pairedEvents.assign([])
            variables.neutronEvents.assign([])

            const startTime = Date.now()
            createReadStream(filePath, { highWaterMark: 4 * 1024 * 1024 })
                .on('data', chunk => {
                    variables.eventBuffer.assign(/** @type {Buffer} */(chunk))
                    variables.processedSize.assign(this._processedSize += chunk.length)
                }).on('end', () => {
                    console.log(`elapsedTime: ${Date.now() - startTime} ms`)

                    variables.eventOffset.assign(0)
                    variables.offsetValue.assign('0')
                })
        }
    }
}
