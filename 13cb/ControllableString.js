import ListenableString from '../13c/ListenableString.js'

export default class extends ListenableString {
    constructor(key, message) {
        super()
        message.addListener(arg => {
            if (arg[key] === undefined) return

            super.assign(arg[key])
        })
    }
}
