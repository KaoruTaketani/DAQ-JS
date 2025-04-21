[home](../README.md)

enable to add listener to boolean, number, string and object.

### before
```js
setInterval(() => {
    randomNumber = Math.random()
    webSocketServer.clients.forEach(ws => {
        ws.send(`random number is ${randomNumber}`)
    })
}, 1000)
```

### after
```js
export default class {
    constructor() {
        this._listeners = []
    }
    addListener(listener) {
        this._listeners.push(listener)
    }
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
    }
}
```

```js
import ListenableNumber from './ListenableNumber.js'

const randomNumber = new ListenableNumber()

randomNumber.addListener(arg => {
    webSocketServer.clients.forEach(ws => {
        ws.send(`random number is ${arg}`)
    })
})

setInterval(() => {
    randomNumber.assign(Math.random())
}, 1000)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser