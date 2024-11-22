const url = new URL(import.meta.url)
url.protocol = 'ws:'
const controllerSocket = new WebSocket(url.href + '/_controller')
controllerSocket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const randomNumberElement = document.createElement('p')
const randomNumberInnerTextSocket = new WebSocket(url.href + '/randomNumberInnerText')
randomNumberInnerTextSocket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
document.body.appendChild(randomNumberElement)

const startButtonElement = document.createElement('input')
startButtonElement.type = 'button'
startButtonElement.value = 'start'
startButtonElement.style.width = '130px'
startButtonElement.onclick = () => {
    controllerSocket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
}
const startButtonDisabledSocket = new WebSocket(url.href + '/startButtonDisabled')
startButtonDisabledSocket.onmessage = event => {
    startButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(startButtonElement)

const stopButtonElement = document.createElement('input')
stopButtonElement.type = 'button'
stopButtonElement.value = 'stop'
stopButtonElement.style.width = '130px'
stopButtonElement.onclick = () => {
    controllerSocket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
}
const stopButtonDisabledSocket = new WebSocket(url.href + '/stopButtonDisabled')
stopButtonDisabledSocket.onmessage = event => {
    stopButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(stopButtonElement)
