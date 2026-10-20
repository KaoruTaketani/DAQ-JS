HistogramSVGInnerHTMLMaker.js:
```js
const ax = {
    xLim: this._histogramBinLimits,
    yLim: [0.1, yMax],
    xTick: edges,
    yTick: [0.1, yMax],
    xTickLabel: edges.map(x => x.toFixed(1)),
    yTickLabel: ['0.1', `${yMax}`],
    yScale: 'log'
}
```
## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser