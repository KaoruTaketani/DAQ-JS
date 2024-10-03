const totalElement = document.createElement('p')
totalElement.innerText = 'total is NaN'
document.body.appendChild(totalElement)

const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const msg = JSON.parse(event.data)

    if (msg.key === 'totalInnerText')
        totalElement.innerText = msg.value
}
