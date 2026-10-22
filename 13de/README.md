Client.js:
```js
element.onmousemove = ev => {
    if (!element.firstChild) return

    const [x, y] = getCurrentPoint(element.firstChild, ev)
    const xLim = getXLim(element.firstChild)
    const yLim = getYLim(element.firstChild)
    const xData = getXData(element.lastChild)
    const yData = getYData(element.lastChild)
    const yDataMin = min(yData)
    const yDataMax = max(yData)
    const scaleX = 560 / 400
    const smallerX = xData.filter(x => x < scaleX * ev.offsetX)
    const maxX = smallerX.length === 0 ? xData[0] : smallerX[smallerX.length - 1]
    const _x = xLim[0] + (xLim[1] - xLim[0]) * (maxX - xData[0]) / (xData[xData.length - 1] - xData[0])
    const _y = yLim[0] + (yLim[1] - yLim[0]) * (yData[smallerX.length - 1] - yDataMax) / (yDataMin - yDataMax)

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