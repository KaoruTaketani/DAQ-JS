const url = new URL(import.meta.url)
url.protocol = 'ws'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    url.pathname = 'histogramSVGInnerHTML'
    const histogramSVGInnerHTMLSocket = new WebSocket(url)
    histogramSVGInnerHTMLSocket.onmessage = event => {
        element.innerHTML = event.data
    }
    element.ondblclick = () => {
        dialogElement.showModal()
    }
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')))