import ListenableBoolean from '../13/ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, requestParams, batchResolve) {
        super(key, requestParams)
        this._onceListeners = []
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            try {
                const value = JSON.parse(arg.get(key))
                if (typeof value === 'boolean') {
                    super.assign(value)
                    if (this._batchResolve) this.addOnceListener(() => {
                        // here, this._bachResolve can be undefined if BatchStopepr is used
                        if (this._batchResolve) this._batchResolve()
                    })
                }
            } catch {
                console.log(`recieved unexpected value for ${key}`)
            }
        })
    }
    addOnceListener(onceListener) {
        this._onceListeners.push(onceListener)
    }
    assign(arg) {
        super.assign(arg)
        this._onceListeners.forEach(onceListener => { onceListener(arg) })
        this._onceListeners.splice(0)
    }
}
