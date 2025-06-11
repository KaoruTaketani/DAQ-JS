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
