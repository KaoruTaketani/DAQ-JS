[home](../README.md)

separate the previous code to multiple files

index.js:
```js
import { Server } from 'http'
import ListenableString from './ListenableString.js'
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
const randomNumberGeneratorDestinationState = new ListenableString()

new HTTPServerRequestHandler(httpServer)
new HTTPServerSetupper(httpServer)
new HTTPServerUpgradeHandler(httpServer, webSocketServer)
new RandomNumberGenerator(randomNumberGeneratorDestinationState, randomNumber)
new RandomNumberInnerTextChanger(randomNumber, webSocketServer)
new WebSocketServerMaker(httpServer, webSocketServer)

randomNumberGeneratorDestinationState.assign('busy')
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
    constructor(randomNumberGeneratorDestinationState,randomNumber) {
        super()
        this._randomNumberGeneratorDestinationState
        randomNumberGeneratorDestinationState.addListener(arg => {
            this._randomNumberGeneratorDestinationState = arg
            this._operation()
        })
        this._interval
        this._state = 'idle'
        this._operation = () => {
            if (this._state === 'idle') {
                if (this._randomNumberGeneratorDestinationState === 'busy') {
                    this._interval = setInterval(() => {
                        randomNumber.assign(Math.random())
                    }, 1000)
                    this._state = this._randomNumberGeneratorDestinationState
                }
                return
            }
            if (this._state === 'busy') {
                if (this._randomNumberGeneratorDestinationState === 'idle') {
                    clearInterval(this._interval)
                    this._state = this._randomNumberGeneratorDestinationState
                }
                return
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