import ListenableNumber from "../13/ListenableNumber.js"

export default class extends ListenableNumber {
    constructor(requestMessage, parser, response) {
        super()
        response.addListener(arg => {
            if (!arg.has(requestMessage)) return

            super.assign(parser(arg.get(requestMessage)))
        })
    }
}
