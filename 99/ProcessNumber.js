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
        /** @type {boolean} */
        this._active = false
        /** @type {string} */
        this._channel = channel
        /** @type {import('./index.js').Process[]} */
        this._processes
        processes.prependListener(arg => { this._processes = arg })
        /** @type {Set<string>} */
        this._calledProcessChannels
        calledProcessChannels.prependListener(arg => { this._calledProcessChannels = arg })
        /** @type {Map<string,string>} */
        this._processVariableTypes
        processVariableTypes.prependListener(arg => { this._processVariableTypes = arg })
        /** @type {import('./AssignableObject.js').default<import('./index.js').Process|undefined>} */
        this._activeProcess = activeProcess

        activeProcess.addListener(arg => {
            if (!arg) return
            // if (arg.key !== this._channel) return
            //
            // console.log(`key: ${arg.key}, value: ${arg.value}`)
            // ok(typeof arg.value === 'number')
            // this._active = true
            // super.assign(arg.value)

            if (arg.key !== this._channel) {
                this._calledProcessChannels.add(this._channel)
            } else {
                // this._calledProcessChannels.add(this._channel)
                console.log(`key: ${arg.key}, value: ${arg.value}`)
                ok(typeof arg.value === 'number')
                super.assign(arg.value)
            }

            if (this._calledProcessChannels.size === this._processVariableTypes.size) {
                this._calledProcessChannels.clear()
                activeProcess.assign(this._processes.shift())
            }
        })
        processVariableTypes.addListener(arg => {
            arg.set(this._channel, 'number')
        })
    }
    /**
     * @override @param {number} arg 
     */
    assign(arg) {
        super.assign(arg)
        if (this._calledProcessChannels.size + 1 === this._processVariableTypes.size) {
            this._calledProcessChannels.clear()
            this._activeProcess.assign(this._processes.shift())
        }
        // if (this._active) {
        //     this._active = false
        //     this._activeProcess.assign(this._processes.shift())
        // }
    }
}
