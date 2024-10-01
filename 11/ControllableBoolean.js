import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, message) {
        super()
        message.addListener(arg => {
            if (Object.keys(arg)[0] !== key) return

            super.assign(Object.values(arg)[0])
        })
    }
}
