export default class {
    constructor(pathname, elementValues, webSocketPathnames) {
        this._pathname = pathname
        this._elementValues
        elementValues.addListener(arg => { this._elementValues = arg })
        this._webSocketPathnames
        webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
    }
    assign(arg) {
        this._elementValues.set(this._pathname, arg)
        this._webSocketPathnames.forEach((pathname, ws) => {
            if (this._pathname !== pathname) return

            ws.send(arg.toString())
        })
    }
}
