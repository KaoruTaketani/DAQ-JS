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

const tableElement = document.createElement('table')
document.body.appendChild(tableElement)

const headerElement = document.createElement('thead')
headerElement.innerHTML = '<tr><th>name</th><th>pulse</th><th>destination</th></tr>'
tableElement.appendChild(headerElement)

const bodyElement = document.createElement('tbody')
tableElement.appendChild(bodyElement)

const xRowElement = document.createElement('tr')
bodyElement.appendChild(xRowElement)

const xNameElement = document.createElement('td')
xNameElement.innerText = 'x'
xRowElement.appendChild(xNameElement)

const xPulseElement = document.createElement('td')
url.pathname = 'xPulseInnerText'
const xPulseInnerTextSocket = new WebSocket(url)
xPulseInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    xPulseElement.innerText = event.data
}
xRowElement.appendChild(xPulseElement)

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
xRowElement.appendChild(xDestinationElement)

const moveXButtonElement = document.createElement('input')
moveXButtonElement.type = 'button'
moveXButtonElement.value = 'move'
// moveXButtonElement.style.width = '130px'
moveXButtonElement.onclick = () => {
    const xDestination = parseInt(xDestinationElement.value)
    if (Number.isNaN(xDestination)) {
        xDestinationElement.value = `NaN`
    } else {
        socket.send(JSON.stringify({ xDestination: xDestination }))
    }
}
url.pathname = 'moveXButtonDisabled'
const moveXButtonDisabledSocket = new WebSocket(url)
moveXButtonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    moveXButtonElement.disabled = event.data === 'true'
}
xRowElement.appendChild(moveXButtonElement)

const thetaRowElement = document.createElement('tr')
bodyElement.appendChild(thetaRowElement)

const thetaNameElement = document.createElement('td')
thetaNameElement.innerText='theta'
thetaRowElement.appendChild(thetaNameElement)

const thetaPulseElement = document.createElement('td')
url.pathname = 'thetaPulseInnerText'
const thetaPulseInnerTextSocket = new WebSocket(url)
thetaPulseInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    thetaPulseElement.innerText = event.data
}
thetaRowElement.appendChild(thetaPulseElement)


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
thetaRowElement.appendChild(thetaDestinationElement)

const moveThetaButtonElement = document.createElement('input')
moveThetaButtonElement.type = 'button'
moveThetaButtonElement.value = 'move'
// moveThetaButtonElement.style.width = '130px'
moveThetaButtonElement.onclick = () => {
    const thetaDestination = parseInt(thetaDestinationElement.value)
    if (Number.isNaN(thetaDestination)) {
        thetaDestinationElement.value = `NaN`
    } else {
        socket.send(JSON.stringify({ thetaDestination: thetaDestination }))
    }
}
url.pathname = 'moveThetaButtonDisabled'
const moveThetaButtonDisabledSocket = new WebSocket(url)
moveThetaButtonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
    moveThetaButtonElement.disabled = event.data === 'true'
}
thetaRowElement.appendChild(moveThetaButtonElement)

