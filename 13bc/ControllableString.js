import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
        })
    }
}
