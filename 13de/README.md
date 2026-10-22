Client.js:
```js
element.onmousemove = ev => {
    if (!element.firstChild) return

    const [x, y] = getCurrentPoint(element.firstChild, ev)
    const xLim = getXLim(element.firstChild)
    const yLim = getYLim(element.firstChild)
    const xDataInPixels = getXData(element.lastChild)
    const yDataInPixels = getYData(element.lastChild)
    const scaleX = 560 / 400
    const smallerXInPixels = xDataInPixels.filter(x => x < scaleX * ev.offsetX)
    const nearestXInPixels = smallerXInPixels.length === 0
        ? xDataInPixels[0]
        : smallerXInPixels[smallerXInPixels.length - 1]
    const px = polyfit([xDataInPixels[0], xDataInPixels[xDataInPixels.length - 1]], xLim, 1)
    const _x = polyval(px, [nearestXInPixels])[0]
    const py = polyfit([max(yDataInPixels), min(yDataInPixels)], yLim, 1)
    const _y = polyval(py, [yDataInPixels[smallerXInPixels.length - 1]])[0]

    if (!isbetween(x, xLim) || !isbetween(y, yLim)) {
        variables.divInnerText.assign(`cursor: undefined`)
    } else {
        variables.divInnerText.assign(`cursor: {x: ${_x}, y: ${_y}}`)
    }
    overlayElement.innerHTML = `<polyline points="${(maxX / scaleX).toFixed()},0 ${(maxX / scaleX).toFixed()},420" stroke="red" fill="none"></polyline>`
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser