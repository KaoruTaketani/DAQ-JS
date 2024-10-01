import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    constructor(channel, message) {
        super()
        message.addListener(arg => {
            if (arg.channel !== channel) return

            super.assign(arg.value)
        })
    }
}
