const messageElement = document.createElement('p')
messageElement.innerText = 'total is NaN'
document.body.appendChild(messageElement)

const clearButtonElement = document.createElement('input')
clearButtonElement.type = 'button'
clearButtonElement.value = 'clear'
clearButtonElement.style.width = '130px'
document.body.appendChild(clearButtonElement)

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
}
clearButtonElement.onclick = () => {
    socket.send(JSON.stringify({ histogramTotal: 0 }))
}
