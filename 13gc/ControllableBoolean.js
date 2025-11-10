import ListenableBoolean from '../13/ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, requestParams, batchResolve) {
        super()
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            try {
                const value = JSON.parse(arg.get(key))
                if (typeof value === 'boolean') {
                    super.assign(value)
                    if (this._batchResolve) this._batchResolve()
                }
            } catch {
                console.log(`recieved unexpected value for ${key}`)
            }
        })
    }
}
