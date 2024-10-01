import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    constructor(channel, message) {
        super()
        message.addListener(arg => {
            if (arg.channel !== channel) return

            super.assign(arg.value)
        })
    }
}
