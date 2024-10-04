import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    constructor(key, message) {
        super()
        message.addListener(arg => {
            if (arg[key] === undefined) return

            super.assign(arg[key])
        })
    }
}
