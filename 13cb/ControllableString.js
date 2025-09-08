import ListenableString from '../13/ListenableString.js'

export default class extends ListenableString {
    constructor(key, message) {
        super()
        message.addListener(arg => {
            if (arg[key] === undefined) return

            super.assign(arg[key])
        })
    }
}
