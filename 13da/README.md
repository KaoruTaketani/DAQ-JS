HistogramSVGInnerHTMLMaker.js:
```js
const ax = {
    xLim: [0.4, 0.8],
    yLim: [0, yMax],
    xTick: colon(0.4, 0.1, 0.8),
    yTick: [0, yMax],
    xTickLabel: colon(0.4, 0.1, 0.8).map(x => x.toFixed(1)),
    yTickLabel: ['0', `${yMax}`]
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser