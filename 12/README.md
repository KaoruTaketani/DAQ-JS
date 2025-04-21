[home](../README.md)

```js
variables.histogram.assign({
    binLimits: [0, 1],
    binCounts: new Array(10).fill(0)
})
```

```js
const i = Math.floor(this._randomNumber * this._histogram.binCounts.length)
this._histogram.binCounts[i]++
variables.histogram.assign(this._histogram)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser