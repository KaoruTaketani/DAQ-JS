const totalElement = document.createElement('p')
totalElement.innerText = 'total is NaN'
document.body.appendChild(totalElement)

const clearButtonElement = document.createElement('input')
clearButtonElement.type = 'button'
clearButtonElement.value = 'clear'
clearButtonElement.style.width = '130px'
document.body.appendChild(clearButtonElement)

const socket = new WebSocket('ws://localhost')
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const msg = JSON.parse(event.data)

    if (msg.key === 'totalInnerText')
        totalElement.innerText = msg.value
}
clearButtonElement.onclick = () => {
    socket.send(JSON.stringify({ histogramTotal: 0 }))
}
