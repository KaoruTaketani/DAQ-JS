
BatchProcessor.js part 1:
```js
Array.from(this._batchParams.entries()).reduce((previous, params) => previous.then(() =>
    new Promise((resolve, reject) => {
        const [key, value] = params
        this._batchReject = reject
        if (this._batchResolve.get(key) === null) {
            variables.requestParams.assign(new URLSearchParams([params]))
            resolve()
        } else {
            this._batchResolve.set(key, resolve)
            variables.requestParams.assign(new URLSearchParams([params]))
        }
    })
), Promise.resolve()).then(() => {
    console.log('finished')
    variables.batchProcessorDestinationState.assign('idle')
}).catch(() => {
    console.log('stopped')
    variables.batchProcessorDestinationState.assign('idle')
})
```
BatchProcessor.js part 2:
```js
if (this._state === 'busy') {
    if (this._batchProcessorDestinationState === 'idle') {
        this._batchReject()
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
