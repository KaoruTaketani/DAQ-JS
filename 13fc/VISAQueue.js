import { openDefaultRM, open, write, read, close } from '../koffi/visa.js'

export default class {
    constructor() {
        /** @type {number} */
        this._driverSession = openDefaultRM()
        /** @type {Buffer} */
        this._buffer = Buffer.alloc(1024)
        this._vi= open(this._driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')
    }
    query(command) {
        write(this._vi, command)
        const retCount = read(this._vi, this._buffer)
        return this._buffer.subarray(0, retCount).toString().trim()
    }
    write(command) {
        write(this._vi, command)
    }
    end() {
        close(this._vi)
        close(this._driverSession)
    }
}