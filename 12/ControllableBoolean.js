import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key) === 'true')
        })
    }
}
