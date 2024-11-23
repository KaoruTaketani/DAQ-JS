const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const totalElement = document.createElement('p')
url.pathname = 'totalInnerText'
const totalInnerTextSocket = new WebSocket(url)
totalInnerTextSocket.onmessage = event => {
    totalElement.innerText = event.data
}
document.body.appendChild(totalElement)

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

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

