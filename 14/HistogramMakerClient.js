const messageElement = document.createElement('p')
messageElement.innerText = 'total is NaN'
document.body.appendChild(messageElement)

const clearButtonElement = document.createElement('input')
clearButtonElement.type = 'button'
clearButtonElement.value = 'clear'
clearButtonElement.style.width = '130px'
document.body.appendChild(clearButtonElement)

const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('width', '400')
svgElement.setAttribute('height', '300')
document.body.appendChild(svgElement)

const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const msg = JSON.parse(event.data)

    if (msg.key === 'messageInnerText')
        messageElement.innerText = msg.value
    if (msg.key === 'svgInnerHTML')
        svgElement.innerHTML = msg.value
    if (msg.key === 'svgViewBox')
        svgElement.setAttribute('viewBox', msg.value)
}
clearButtonElement.onclick = () => {
    socket.send(JSON.stringify({ histogramTotal: 0 }))
}
