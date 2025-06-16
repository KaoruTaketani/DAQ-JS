[home](../README.md)

TimeSeriesInitializer.js:
```js
variables.timeSeries.assign({
    time: new Array(16).fill(Number.NaN),
    data: new Array(16).fill(Number.NaN)
})
```

TimeSeriesMaker.js:
```js
this._timeSeries.time.copyWithin(0, 1)
this._timeSeries.time[this._timeSeries.time.length - 1] = Date.now()
this._timeSeries.data.copyWithin(0, 1)
this._timeSeries.data[this._timeSeries.data.length - 1] = this._randomNumber
variables.timeSeries.assign(this._timeSeries)
```

TimeSeriesSVGInnerHTMLMaker.js:
```js
const ax = {
    xLim: [min(this._timeSeries.time), max(this._timeSeries.time)],
    yLim: [0, 1],
    xTick: [min(this._timeSeries.time), max(this._timeSeries.time)],
    yTick: linspace(0, 1, 11),
    xTickLabel: [
        (new Date(min(this._timeSeries.time))).toLocaleTimeString(),
        (new Date(max(this._timeSeries.time))).toLocaleTimeString()
    ],
    yTickLabel: linspace(0, 1, 11).map(x => x.toFixed(1))
}
variables.timeSeriesSVGInnerHTML.assign([
    axes(ax),
    line(ax, this._timeSeries.time, this._timeSeries.data)
].join(''))
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser
1. click start button
