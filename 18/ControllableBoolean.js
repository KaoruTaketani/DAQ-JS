import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, message) {
        super()
        message.addListener(arg => {
            if (arg[key] === undefined) return

            super.assign(arg[key])
        })
    }
}
