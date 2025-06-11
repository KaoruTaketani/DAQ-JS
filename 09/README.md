[home](../README.md)

set all operators accept only one argument
### before
index.js:
```js
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
```

### after
Variables.js:
```js
import ListenableBoolean from './ListenableBoolean.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.webSocketServer = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ListenableBoolean()
    }
}
```

index.js:
```js
const variables = new Variables()

new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new WebSocketServerMaker(variables)
```


## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser