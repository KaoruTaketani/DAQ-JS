import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').ChannelEvent[]} */
        this._channelEvents
        variables.channelEvents.prependListener(arg => { this._channelEvents = arg })
        /** @type {number} */
        this._edrFileSize
        variables.edrFileSize.prependListener(arg => { this._edrFileSize = arg })
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.prependListener(arg => { this._kickerPulseCount = arg })
        /** @type {number} */
        this._actualMeasuremntTimeInSeconds
        variables.actualMeasuremntTimeInSeconds.prependListener(arg => { this._actualMeasuremntTimeInSeconds = arg })
        /** @type {number} */
        this._expectedMeasuremntTimeInSeconds
        variables.expectedMeasuremntTimeInSeconds.prependListener(arg => { this._expectedMeasuremntTimeInSeconds = arg })
        /** @type {number} */
        this._processedSize
        variables.processedSize.addListener(arg => {
            this._processedSize = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._channelEvents) return

            variables.messageInnerText.assign([
                `bytes: ${this._processedSize.toLocaleString()}/ ${this._edrFileSize.toLocaleString()}`,
                `channelEvents.length: ${this._channelEvents.length.toLocaleString()}`,
                `kickerPulseCounts: ${this._kickerPulseCount.toLocaleString()}`,
                `expectedMeasurementTimeInSeconds: ${this._expectedMeasuremntTimeInSeconds.toLocaleString()}`,
                `actualMeasurementTimeInSeconds: ${this._actualMeasuremntTimeInSeconds.toLocaleString()}`
            ].join('\n'))
        }
    }
}
