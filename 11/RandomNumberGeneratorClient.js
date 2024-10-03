const randomNumberElement = document.createElement('p')
randomNumberElement.innerText = 'random number is NaN'
document.body.appendChild(randomNumberElement)

const clearButtonElement = document.createElement('input')
clearButtonElement.type = 'button'
clearButtonElement.value = 'start'
clearButtonElement.style.width = '130px'
document.body.appendChild(clearButtonElement)

const stopButtonElement = document.createElement('input')
stopButtonElement.type = 'button'
stopButtonElement.value = 'stop'
stopButtonElement.style.width = '130px'
stopButtonElement.disabled = true
document.body.appendChild(stopButtonElement)

const socket = new WebSocket('ws://localhost')
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const msg = JSON.parse(event.data)

    if (msg.key === 'randomNumberInnerText')
        randomNumberElement.innerText = msg.value
    if (msg.key === 'randomNumberStartDisabled')
        clearButtonElement.disabled = msg.value
    if (msg.key === 'randomNumberStopDisabled')
        stopButtonElement.disabled = msg.value
}
clearButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
}
stopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
}

