[home](../README.md)

separate the previous code to multiple files

index.js:
```js
import { Server } from 'http'
import ListenableBoolean from './ListenableBoolean.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import WebSocketServerMaker from './WebSocketServerMaker.js'

const randomNumber = new ListenableNumber()
const httpServer = new ListenableObject()
const webSocketServer = new ListenableObject()
const randomNumberGeneratorIsBusy = new ListenableBoolean()

new HTTPServerRequestHandler(httpServer)
new HTTPServerSetupper(httpServer)
new HTTPServerUpgradeHandler(httpServer, webSocketServer)
new RandomNumberGenerator(randomNumberGeneratorIsBusy, randomNumber)
new RandomNumberInnerTextChanger(randomNumber, webSocketServer)
new WebSocketServerMaker(httpServer, webSocketServer)

randomNumberGeneratorIsBusy.assign(true)
httpServer.assign(new Server()) 
```

Operator.js:
```js
export default class {
    constructor() {
        this._operation
    }
}
```

RandomNumberGenerator.js:
```js
import Operator from './Operator.js'

export default class extends Operator {
    constructor(randomNumberGeneratorIsBusy,randomNumber) {
        super()
        this._randomNumberGeneratorIsBusy
        randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._interval
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                this._interval = setInterval(() => {
                    randomNumber.assign(Math.random())
                }, 1000)
            } else {
                clearInterval(this._interval)
            }
        }
    }
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser