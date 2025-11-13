import { openDefaultRM, open, write, read, close } from '../koffi-visa/visa.js'

export default class {
    constructor() {
        /** @type {number} */
        this._driverSession = openDefaultRM()
        /** @type {Buffer} */
        this._buffer = Buffer.alloc(1024)
    }
    query(command) {
        const vi = open(this._driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')
        write(vi, command)
        const retCount = read(vi, this._buffer)
        close(vi)
        return this._buffer.subarray(0, retCount).toString().trim()
    }
    write(command) {
        const vi = open(this._driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')
        write(vi, command)
        close(vi)
    }
    end() {
        close(this._driverSession)
    }
}