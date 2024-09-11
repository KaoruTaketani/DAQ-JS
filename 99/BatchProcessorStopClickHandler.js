import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./BatchProcessorVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._activeMotorKey
        variables.main.activeMotorKey.prependListener(arg => { this._activeMotorKey = arg })
        /** @type {Map<string,import('./index.js').MotorSetting>} */
        this._motorSettings
        variables.main.motorSettings.prependListener(arg => { this._motorSettings = arg })
        /** @type {import('./index.js').Process[]} */
        this._completedProcesses
        variables.main.completedProcesses.prependListener(arg => { this._completedProcesses = arg })
        /** @type {import('./index.js').Process[]} */
        this._processes
        variables.main.processes.prependListener(arg => { this._processes = arg })
        /** @type {import('./index.js').Process|undefined} */
        this._activeProcess
        variables.main.activeProcess.prependListener(arg => { this._activeProcess = arg })
        /** @type {string} */
        this._clickedElementValue
        variables.clickedElementValue.addListener(arg => {
            this._clickedElementValue = arg
            this._operation()
        })
        this._operation = () => {
            if (this._clickedElementValue !== 'stop') return
            console.log('stop Processor')

            /// mcuClientSocket.on('close') is expected to be called by the stop command 
            // const activeMotor = this._motorChannels.get(this._activeMotorKey)
            // ok(activeMotor)
            // if (!this._mcuClientSocket.closed)
            //     this._mcuClientSocket.end(`stop:${activeMotor.channel}`)
            let process
            do {
                process = this._processes.shift()
                if (process !== undefined) this._completedProcesses.push(process)
            } while (process !== undefined)

            if (!this._activeProcess) {
                console.log('activeProcess is undefined')
            } else {
                console.log(`${this._activeProcess.key} ${this._activeProcess.value}`)
                if (this._activeProcess.key === 'eventReaderIsBusy') {
                    // copied from EventReaderStopClickHandler
                    variables.main.eventReaderDevice.assign('')
                }
                if (this._activeProcess.key === 'motorDestination') {
                    // copied from MotorControllerStopClickHandler
                    const activeMotor = this._motorSettings.get(this._activeMotorKey)
                    ok(activeMotor)
                    variables.main.stopperDeviceName.assign(activeMotor.device)
                }
            }
        }
    }
}
