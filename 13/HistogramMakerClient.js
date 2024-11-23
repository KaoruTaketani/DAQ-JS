const totalElement = document.createElement('p')
totalElement.innerText = 'total is NaN'
document.body.appendChild(totalElement)

const startTimeElement = document.createElement('p')
startTimeElement.innerText = 'start time is undefined'
document.body.appendChild(startTimeElement)

const socket = new WebSocket('ws://localhost')
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const msg = JSON.parse(event.data)

    if (msg.key === 'totalInnerText')
        totalElement.innerText = msg.value
    if (msg.key === 'startTimeInnerText')
        startTimeElement.innerText = msg.value
}
