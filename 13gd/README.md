
BatchProcessor.js part 1:
```js
if (this._batchProcessorState === 'idle') {
    if (this._batchProcessorDestinationState === 'busy') {
        variables.batchProcessorState.assign('busy')
        Array.from(this._batchParams.entries()).reduce((previous, params) => previous.then(() =>
            new Promise((resolve, reject) => {
                this._batchReject = reject
                variables.batchResolve.assign(resolve)
                variables.requestParams.assign(new URLSearchParams([params]))
            })
        ), Promise.resolve()).then(() => {
             console.log('finished')
            variables.batchResolve.assign(undefined)
            variables.batchProcessorState.assign('idle')
        }).catch(() => {
            console.log('stopped')
            variables.batchResolve.assign(undefined)
            variables.batchProcessorState.assign('idle')
        })
    }
}
if(this._batchProcessorState === 'busy') {
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
