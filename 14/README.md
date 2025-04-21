[home](../README.md)

### before

```js
this._webSocketPathnames.forEach((pathname, ws) => {
    if (pathname !== '/randomNumberInnerText') return

    ws.send(`random number is ${this._randomNumber}`)
})
```

### after
```js
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

            ws.send(arg)
        })
    }
}
```

```js
this._webSocketServer.handleUpgrade(request, socket, head, ws => {

    this._elementValues.forEach((value, key) => {
        if (request.url !== key) return

        if (typeof value === 'string')
            ws.send(value)
        if (typeof value === 'boolean')
            ws.send(value.toString())
    })
})
```

```js
variables.randomNumberInnerText.assign(`random number is ${this._randomNumber}`)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser