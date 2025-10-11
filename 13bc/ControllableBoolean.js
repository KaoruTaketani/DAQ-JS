import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, message) {
        super()
        message.addListener(arg => {
            if (!arg.has(key)) return

            try {
                const value = JSON.parse(arg.get(key))
                if (typeof value === 'boolean') super.assign(value)
            } catch {
                console.log(`recieved unexpected value for ${key}`)
            }
        })
    }
}
