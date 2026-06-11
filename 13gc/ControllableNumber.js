import ListenableNumber from '../13/ListenableNumber.js'

export default class extends ListenableNumber {
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            const value = parseFloat(arg.get(key))
            if (Number.isFinite(value)) {
                super.assign(value)
            }
        })
    }
}
