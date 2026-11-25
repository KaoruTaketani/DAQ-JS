import ListenableNumber from "../13/ListenableNumber.js"

export default class extends ListenableNumber {
    constructor(request, parser, response) {
        super()
        response.addListener(arg => {
            if (!arg.has(request)) return

            super.assign(parser(arg.get(request)))
        })
    }
}
