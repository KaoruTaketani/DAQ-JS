const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const startButtonElement = document.createElement('input')
startButtonElement.type = 'button'
startButtonElement.value = 'start'
startButtonElement.style.width = '130px'
startButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
}
url.pathname = 'startButtonDisabled'
const startButtonDisabledSocket = new WebSocket(url)
startButtonDisabledSocket.onmessage = event => {
    startButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(startButtonElement)

const stopButtonElement = document.createElement('input')
stopButtonElement.type = 'button'
stopButtonElement.value = 'stop'
stopButtonElement.style.width = '130px'
stopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
}
url.pathname = 'stopButtonDisabled'
const stopButtonDisabledSocket = new WebSocket(url)
stopButtonDisabledSocket.onmessage = event => {
    stopButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(stopButtonElement)

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

const randomNumberElement = document.createElement('p')
url.pathname = 'randomNumberInnerText'
const randomNumberInnerTextSocket = new WebSocket(url)
randomNumberInnerTextSocket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
document.body.appendChild(randomNumberElement)

const cursorElement = document.createElement('p')
cursorElement.innerText = 'cursor: undefined'
document.body.appendChild(cursorElement)

const histogramSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
histogramSVGElement.setAttribute('width', '400')
histogramSVGElement.setAttribute('height', '300')
histogramSVGElement.setAttribute('viewBox', '0 0 560 420')
url.pathname = 'histogramSVGInnerHTML'
const histogramSVGInnerHTMLSocket = new WebSocket(url)
histogramSVGInnerHTMLSocket.onmessage = event => {
    histogramSVGElement.innerHTML = event.data
}
histogramSVGElement.onmousemove = ev => {
    const axes = histogramSVGElement.firstChild

    const xInPixels = ev.offsetX * 560 / 400
    const xInNormalized = (xInPixels - axes.dataset.xminInPixels)
        / (axes.dataset.xmaxInPixels - axes.dataset.xminInPixels)
    const xInData = Number(axes.dataset.xminInData)
        + xInNormalized * (axes.dataset.xmaxInData - axes.dataset.xminInData)

    const yInPixels = ev.offsetY * 420 / 300
    const yInNormalized = (axes.dataset.yminInPixels - yInPixels)
        / (axes.dataset.yminInPixels - axes.dataset.ymaxInPixels)
    const yInData = Number(axes.dataset.yminInData)
        + yInNormalized * (axes.dataset.ymaxInData - axes.dataset.yminInData)

    if (xInNormalized < 0 || xInNormalized > 1) {
        cursorElement.innerText = `cursor: undefined`
        return
    }
    if (yInNormalized < 0 || yInNormalized > 1) {
        cursorElement.innerText = `cursor: undefined`
        return
    }
    const points = histogramSVGElement.lastChild.getAttribute('points')
    
    const i = points.split(' ')
        .map(point => parseFloat(point))
        .filter(x => x <= xInPixels)
        .length
    const point = points.split(' ')[i]
    const xStairInPixels = parseFloat(point.split(',')[0])
    const xStairInNormalized = (xStairInPixels - axes.dataset.xminInPixels)
        / (axes.dataset.xmaxInPixels - axes.dataset.xminInPixels)
    const xStairInData = Number(axes.dataset.xminInData)
        + xStairInNormalized * (axes.dataset.xmaxInData - axes.dataset.xminInData)

    const yStairInPixels = parseFloat(point.split(',')[1])
    const yStairInNormalized = (axes.dataset.yminInPixels - yStairInPixels)
        / (axes.dataset.yminInPixels - axes.dataset.ymaxInPixels)
    const yStairInData = Number(axes.dataset.yminInData)
        + yStairInNormalized * (axes.dataset.ymaxInData - axes.dataset.yminInData)

        cursorElement.innerText = `upperEdge: ${xStairInData}, binCount: ${yStairInData}`
    lineElement.setAttribute('points', `${ev.offsetX},0 ${ev.offsetX},420`)
}
document.body.appendChild(histogramSVGElement)

const foreignElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
foreignElement.setAttribute('width', '400')
foreignElement.setAttribute('height', '300')
foreignElement.appendChild(histogramSVGElement)
const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
lineElement.setAttribute('stroke', 'red')
const overlayElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
overlayElement.setAttribute('width', '400')
overlayElement.setAttribute('height', '300')
overlayElement.appendChild(foreignElement)
overlayElement.appendChild(lineElement)
overlayElement.ondblclick = () => {
    dialogElement.showModal()
}
document.body.appendChild(overlayElement)


const timeSeriesSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
timeSeriesSVGElement.setAttribute('width', '400')
timeSeriesSVGElement.setAttribute('height', '300')
timeSeriesSVGElement.setAttribute('viewBox', '0 0 560 420')
url.pathname = 'timeSeriesSVGInnerHTML'
const timeSeriesSVGInnerHTMLSocket = new WebSocket(url)
timeSeriesSVGInnerHTMLSocket.onmessage = event => {
    timeSeriesSVGElement.innerHTML = event.data
}
document.body.appendChild(timeSeriesSVGElement)

