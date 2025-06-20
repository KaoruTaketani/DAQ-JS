const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const stopButtonElement = document.createElement('input')
stopButtonElement.type = 'button'
stopButtonElement.value = 'stop'
stopButtonElement.style.width = '130px'
stopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
}
url.pathname = 'stopButtonDisabled'
const stopButtonDisabledSocket = new WebSocket(url)
stopButtonDisabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
    stopButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(stopButtonElement)

const xPulseElement = document.createElement('p')
url.pathname = 'xPulseInnerText'
const xPulseInnerTextSocket = new WebSocket(url)
xPulseInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    xPulseElement.innerText = event.data
}
document.body.appendChild(xPulseElement)

const xDestinationElement = document.createElement('input')
xDestinationElement.style.width = '130px'
url.pathname = 'xDestinationDisabled'
const xDestinationDisabledSocket = new WebSocket(url)
xDestinationDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    xDestinationElement.disabled = event.data === 'true'
}
url.pathname = 'xDestinationValue'
const xDestinationValueSocket = new WebSocket(url)
xDestinationValueSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    xDestinationElement.value = event.data
}
document.body.appendChild(xDestinationElement)

const moveXButtonElement = document.createElement('input')
moveXButtonElement.type = 'button'
moveXButtonElement.value = 'move x'
moveXButtonElement.style.width = '130px'
moveXButtonElement.onclick = () => {
    socket.send(JSON.stringify({ xDestination: xDestinationElement.value }))
}
url.pathname = 'moveXButtonDisabled'
const moveXButtonDisabledSocket = new WebSocket(url)
moveXButtonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    moveXButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(moveXButtonElement)

const thetaPulseElement = document.createElement('p')
url.pathname = 'thetaPulseInnerText'
const thetaPulseInnerTextSocket = new WebSocket(url)
thetaPulseInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    thetaPulseElement.innerText = event.data
}
document.body.appendChild(thetaPulseElement)


const thetaDestinationElement = document.createElement('input')
thetaDestinationElement.style.width = '130px'
url.pathname = 'thetaDestinationDisabled'
const thetaDestinationDisabledSocket = new WebSocket(url)
thetaDestinationDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    thetaDestinationElement.disabled = event.data === 'true'
}
url.pathname = 'thetaDestinationValue'
const thetaDestinationValueSocket = new WebSocket(url)
thetaDestinationValueSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    thetaDestinationElement.value = event.data
}
document.body.appendChild(thetaDestinationElement)

const moveThetaButtonElement = document.createElement('input')
moveThetaButtonElement.type = 'button'
moveThetaButtonElement.value = 'move theta'
moveThetaButtonElement.style.width = '130px'
moveThetaButtonElement.onclick = () => {
    socket.send(JSON.stringify({ thetaDestination: thetaDestinationElement.value }))
}
url.pathname = 'moveThetaButtonDisabled'
const moveThetaButtonDisabledSocket = new WebSocket(url)
moveThetaButtonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    moveThetaButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(moveThetaButtonElement)

