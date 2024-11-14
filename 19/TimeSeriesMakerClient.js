const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('width', '400')
svgElement.setAttribute('height', '300')
svgElement.setAttribute('viewBox', '0 0 560 420')
document.body.appendChild(svgElement)

const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const elementValue = JSON.parse(event.data)

    if (elementValue.hash === '#svgInnerHTML')
        svgElement.innerHTML = elementValue.value
}
