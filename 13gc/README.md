index.js:
```js
variables.batchProcessorState.assign('idle')
variables.batchParams.assign(new URLSearchParams([
    ['preset', '10'],
    ['randomNumberGeneratorDestinationState', 'busy'],
    ['preset', '20'],
    ['randomNumberGeneratorDestinationState', 'busy'],
    ['preset', '30'],
    ['randomNumberGeneratorDestinationState', 'busy'],
    ['preset', '40'],
    ['randomNumberGeneratorDestinationState', 'busy'],
    ['preset', '50'],
    ['randomNumberGeneratorDestinationState', 'busy']
]))
```

BatchProcessor.js:
```js
variables.batchProcessorState.assign('busy')
Array.from(this._batchParams.entries()).reduce((previous, params, index) => previous.then(() =>
    new Promise(resolve => {
        variables.batchIndex.assign(index)
        variables.batchResolve.assign(resolve)
        variables.requestParams.assign(new URLSearchParams([params]))
    })
), Promise.resolve()).then(() => {
    variables.batchIndex.assign(-1)
    variables.batchResolve.assign(undefined)
    variables.batchProcessorState.assign('idle')
})
```
ControllableNumber.js:
```js
export default class extends ListenableNumber {
    constructor(key, requestParams, batchResolve) {
        super()
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            const value = parseFloat(arg.get(key))
            if (Number.isFinite(value)) {
                super.assign(value)
                if (this._batchResolve) {
                    this._batchResolve()
                }
            }
        })
        this._batchResolve
        batchResolve.addListener(arg => {
            this._batchResolve = arg
        })
    }
}
```

DestinationString.js:
```js
export default class extends ListenableString {
    constructor(key, requestParams, batchResolve) {
        super()
        this._key = key
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
        })
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
    }
    assign(arg) {
        super.assign(arg)
        if (this._batchResolve) {
            this._batchResolve()
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
1. click start button
