import { openDefaultRM, open, write, readAsync, close, register, installHandler, enableEvent, VI_ATTR_RET_COUNT, read_async } from '../koffi/visa.js'

export default class {
    constructor(parsers) {
        this._parsers = parsers
        /** @type {boolean} */
        this._isBusy = false
        /** @type {string[]} */
        this._queue = []
        /** @type {string} */
        this._message
        /** @type {number} */
        this._driverSession = openDefaultRM()
        /** @type {Buffer} */
        this._buffer = Buffer.alloc(1024)
        this._RdCount = 0
        this._vi = open(this._driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')
        // this._callback = register((vi, etype, event, userHandle) => {
        //     console.log(`called vi: ${vi}, etype: ${etype}, event: ${event}, userHandle:${userHandle}`)
        //     // this._RdCount = getAttribute(event, VI_ATTR_RET_COUNT)
        //     // console.log(`RdCount: ${RdCount}`)
        //     // const data = this._buffer.subarray(0, RdCount).toString()
        //     // console.log(`Here is the data: ${this._message} is ${data}`)

        //     // const parser = this._parsers.get(this._message)

        //     // if (parser) {
        //     //     parser(data)
        //     // }

        //     // this._isBusy = false
        //     // this._next()

        //     // following code is necessary to prevent warning
        //     return 0
        // })
        // installHandler(this._vi, this._callback)
        // enableEvent(this._vi)
    }
    flush() {
        this._queue.splice(0)
    }
    /**
     * @param {string} message
     * @param {function} callback 
     */
    push(message) {
        this._queue.push(message)
        this._next()
    }
    _next() {
        if (this._isBusy) return

        this._message = this._queue.shift()
        if (!this._message) {
            return
        }
        // console.log(this._message)
        write(this._vi, this._message)
        // const jobId = readAsync(this._vi, this._buffer)
        // console.log(`jobId: ${jobId}, vi: ${this._vi}, message: ${this._message}`)
        read_async(this._vi, this._buffer, count => {
            const data = this._buffer.subarray(0, count).toString()
            console.log(`count: ${count}, data: ${data}`)
            const parser = this._parsers.get(this._message)

            if (parser) {
                parser(data)
            }
            this._isBusy = false
            this._next()
        })

        this._isBusy = true
    }
}