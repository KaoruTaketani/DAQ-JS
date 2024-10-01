import AssignableNumber from './AssignableNumber.js'
import { ok } from 'assert'

export default class extends AssignableNumber {
    /**
     * @param {string} channel
     * @param {import('./AssignableObject.js').default<import('./index.js').Process[]>} processes
     * @param {import('./AssignableObject.js').default<import('./index.js').Process|undefined>} activeProcess
     * @param {import('./AssignableObject.js').default<Map<string,string>>} processVariableTypes
     * @param {import('./AssignableObject.js').default<Set<string>>} calledProcessChannels
     */
    constructor(channel, processes, activeProcess, processVariableTypes, calledProcessChannels) {
        super()
        /** @type {string} */
        this._channel = channel
        /** @type {import('./index.js').Process[]} */
        this._processes
        processes.prependListener(arg => { this._processes = arg })
        /** @type {Map<string,string>} */
        this._processVariableTypes
        processVariableTypes.prependListener(arg => { this._processVariableTypes = arg })
        /** @type {Set<string>} */
        this._calledProcessChannels
        calledProcessChannels.prependListener(arg => { this._calledProcessChannels = arg })

        activeProcess.addListener(arg => {
            if (!arg) return

            if (arg.key !== this._channel) {
                this._calledProcessChannels.add(this._channel)
            } else {
                this._calledProcessChannels.add(this._channel)
                console.log(`key: ${arg.key}, value: ${arg.value}`)
                ok(typeof arg.value === 'number')
                super.assign(arg.value)
            }

            if (this._calledProcessChannels.size === this._processVariableTypes.size){
                this._calledProcessChannels.clear()
                activeProcess.assign(this._processes.shift())
            }
        })
        processVariableTypes.addListener(arg => {
            arg.set(this._channel, 'number')
        })
    }
}
