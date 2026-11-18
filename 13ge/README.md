both ControllableNumber.js and DestinationString.js add batchLimits, limits in their constructors:
```js
this._batchLimits
batchLimits.addListener(arg => { this._batchLimits = arg })
limits.addListener(arg => {
    this._batchLimits.set(key, arg)
})
```


## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser
1. click start button
