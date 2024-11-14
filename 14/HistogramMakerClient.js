const totalElement = document.createElement('p')
document.body.appendChild(totalElement)

const startTimeElement = document.createElement('p')
document.body.appendChild(startTimeElement)

const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const elementValue = JSON.parse(event.data)

    if (elementValue.hash === '#totalInnerText')
        totalElement.innerText = elementValue.value
    if (elementValue.hash === '#startTimeInnerText')
        startTimeElement.innerText = elementValue.value
}
