[home](../README.md)

HistogramSVGInnerHTMLMaker.js:
```js
const ax = {
    xLim: this._histogramBinLimits,
    yLim: [0, max(this._histogramBinCounts)],
    xTick: linspace(0, 1, 11),
    yTick: [0, max(this._histogramBinCounts)],
    xTickLabel: linspace(0, 1, 11).map(x => x.toFixed(1)),
    yTickLabel: ['0', `${max(this._histogramBinCounts)}`]
}
variables.histogramSVGInnerHTML.assign([
    axes(ax),
    xlabel(ax, 'random number'),
    ylabel(ax, 'counts'),
    stairs(ax, linspace(0, 1, 11), this._histogramBinCounts)
].join(''))
```

Client.js:
```js
const histogramSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
histogramSVGElement.setAttribute('width', '400')
histogramSVGElement.setAttribute('height', '300')
histogramSVGElement.setAttribute('viewBox', '0 0 560 420')
url.pathname = 'histogramSVGInnerHTML'
const histogramSVGInnerHTMLSocket = new WebSocket(url)
histogramSVGInnerHTMLSocket.onmessage = event => {
    histogramSVGElement.innerHTML = event.data
}
document.body.appendChild(histogramSVGElement)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser
1. click start button
