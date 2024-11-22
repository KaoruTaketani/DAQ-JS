const url = new URL(import.meta.url)
url.protocol = 'ws:'
const controllerSocket = new WebSocket(url.href + '/_controller')
controllerSocket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const totalElement = document.createElement('p')
const totalInnerTextSocket = new WebSocket(url.href + '/totalInnerText')
totalInnerTextSocket.onmessage = event => {
    totalElement.innerText = event.data
}
document.body.appendChild(totalElement)

const startTimeElement = document.createElement('p')
const startTimeInnerTextSocket = new WebSocket(url.href + '/startTimeInnerText')
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)
