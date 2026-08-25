[home](../README.md)

Client.js:
```js
histogramSVGElement.onmousemove = ev => {
    if (!element.firstChild) return

    const [x, y] = getCurrentPoint(element.firstChild, ev)
    const xLim = getXLim(element.firstChild)
    const yLim = getYLim(element.firstChild)

    if (!isbetween(x, xLim) || !isbetween(y, yLim)) {
        cursorElement.innerText = `cursor: undefined`
    } else {
        cursorElement.innerText = `cursor: {x: ${x}, y: ${y}}`
    }
}
```
## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser