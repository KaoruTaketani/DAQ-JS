import { openDefaultRM, open, setAttribute, VI_ATTR_TMO_VALUE, write, read, close } from '../koffi-visa/visa.js'

export default class {
    constructor(rsrcName, response) {
        this._rsrcName = rsrcName
        this._defaultRM = openDefaultRM()
        this._response = response
    }
    push(request) {
        const instr = open(this._defaultRM, this._rsrcName)
        setAttribute(instr, VI_ATTR_TMO_VALUE, 500)
        write(instr, request)
        const buf = new Uint8Array(100)
        const retCount = read(instr, buf)
        const data = new TextDecoder().decode(buf.subarray(0, retCount))
        console.log('Read result:', data)
        this._response.assign(new URLSearchParams([[request, data]]))
        close(instr)
    }
}