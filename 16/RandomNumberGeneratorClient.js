const randomNumberElement = document.createElement('p')
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
document.body.appendChild(stopButtonElement)

const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const elementValue = JSON.parse(event.data)

    if (elementValue.hash === '#randomNumberInnerText')
        randomNumberElement.innerText = elementValue.value
    if (elementValue.hash === '#randomNumberStartDisabled')
        clearButtonElement.disabled = elementValue.value
    if (elementValue.hash === '#randomNumberStopDisabled')
        stopButtonElement.disabled = elementValue.value
}
clearButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
}
stopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
}

