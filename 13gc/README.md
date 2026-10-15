index.js:
```js
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
const ng = Array.from(this._batchParams.keys())
    .filter(key => !this._batchResolve.has(key))
if (ng.length > 0) return

Array.from(this._batchParams.entries()).reduce((previous, params) => previous.then(() =>
    new Promise(resolve => {
        const [key, value] = params
        if (this._batchResolve.get(key) === null) {
            variables.requestParams.assign(new URLSearchParams([params]))
            resolve()
        } else {
            this._batchResolve.set(key, resolve)
            variables.requestParams.assign(new URLSearchParams([params]))
        }
    })
), Promise.resolve()).then(() => {
    variables.batchProcessorDestinationState.assign('idle')
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
            }
        })
        batchResolve.addListener(arg => {
            arg.set(key, null)
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
        batchResolve.addListener(arg => {
            this._batchResolve = arg
            this._batchResolve.set(this._key, undefined)
        })
    }
    assign(arg) {
        super.assign(arg)
        if (this._batchResolve.get(this._key) !== undefined) {
            this._batchResolve.get(this._key)()
            this._batchResolve.set(this._key, undefined)
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
