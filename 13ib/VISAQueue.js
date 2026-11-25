import { openDefaultRM, register, unregister, open, installHandler, enableEvent, write, readAsync, close, getAttribute, VI_ATTR_RET_COUNT, terminate, uninstallHandler } from '../koffi-visa/visa.js'

export default class {
    constructor(rsrcName, response) {
        this._rsrcName = rsrcName
        this._response = response

        /** @type {boolean} */
        this._isBusy = false
        /** @type {string[]} */
        this._queue = []
        /** @type {string} */
        this._request

        this._RdCount = -1
        this._defaultRM = openDefaultRM()
        this._buffer = new Uint8Array(4096)
        this._inst = open(this._defaultRM, this._rsrcName)
        this._handle = register((/** @type {number} */vi,/** @type {number} */etype,/** @type {number} */event,/** @type {function} */userHandle) => {
            console.log(`called vi: ${vi}, etype: ${etype}, event: ${event}, userHandle:${userHandle}`)
            this._RdCount = getAttribute(event, VI_ATTR_RET_COUNT)
            const tmp = new TextDecoder().decode(this._buffer.subarray(0, this._RdCount))
            // console.log(tmp)
            response.assign(new URLSearchParams([[this._request, tmp]]))

            this._isBusy = false
            this._next()
            return 0
        })
        installHandler(this._inst, this._handle)
        enableEvent(this._inst)
    }
    push(request) {
        this._queue.push(request)
        this._next()
    }
    _next() {
        if (this._isBusy) return

        this._request = this._queue.shift()
        // console.log(this._request, this._queue)
        if (!this._request) {
            // close(this._inst)
            return
        }

        // if (!this._socket.pending) {
        //     this._socket.write(this._request)
        // } else {
        //     this._socket.connect(this._port, this._host, () => {
        //         this._socket.write(this._request)
        //     })
        // }
        this._isBusy = true

        write(this._inst, this._request)
        const job = readAsync(this._inst, this._buffer)

    }
}