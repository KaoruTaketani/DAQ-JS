const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const startButtonElement = document.createElement('input')
startButtonElement.type = 'button'
startButtonElement.value = 'start'
startButtonElement.style.width = '130px'
startButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
}
url.pathname = 'startButtonDisabled'
const startButtonDisabledSocket = new WebSocket(url)
startButtonDisabledSocket.onmessage = event => {
    startButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(startButtonElement)

const stopButtonElement = document.createElement('input')
stopButtonElement.type = 'button'
stopButtonElement.value = 'stop'
stopButtonElement.style.width = '130px'
stopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
}
url.pathname = 'stopButtonDisabled'
const stopButtonDisabledSocket = new WebSocket(url)
stopButtonDisabledSocket.onmessage = event => {
    stopButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(stopButtonElement)

const presetLabelElement = document.createElement('label')
presetLabelElement.innerText = 'preset'
let presetValue
const presetElement = document.createElement('input')
presetElement.type = 'number'
presetElement.min = 1
presetElement.addEventListener('change', () => {
    if (Number.isNaN(presetElement.valueAsNumber)) {
        presetElement.value = presetValue
        return
    }

    socket.send(JSON.stringify({ preset: presetElement.valueAsNumber }))
})
url.pathname = 'presetValue'
const presetValueSocket = new WebSocket(url)
presetValueSocket.onmessage = event => {
    presetElement.value = event.data
    presetValue = presetElement.value
}
url.pathname = 'presetDisabled'
const presetDisabledSocket = new WebSocket(url)
presetDisabledSocket.onmessage = event => {
    presetElement.disabled = event.data === 'true'
}
presetLabelElement.appendChild(presetElement)
document.body.appendChild(presetLabelElement)

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

const scanFromLabelElement = document.createElement('label')
scanFromLabelElement.innerText = 'from'
let scanFromValue
const scanFromElement = document.createElement('input')
scanFromElement.type = 'number'
scanFromElement.min = 1
scanFromElement.addEventListener('change', () => {
    if (Number.isNaN(scanFromElement.valueAsNumber)) {
        scanFromElement.value = minimumValue
        return
    }

    socket.send(JSON.stringify({ scanFrom: scanFromElement.valueAsNumber }))
})
url.pathname = 'scanFromValue'
const scanFromValueSocket = new WebSocket(url)
scanFromValueSocket.onmessage = event => {
    scanFromElement.value = event.data
    scanFromValue = scanFromElement.value
}
url.pathname = 'scanFromDisabled'
const scanFromDisabledSocket = new WebSocket(url)
scanFromDisabledSocket.onmessage = event => {
    scanFromElement.disabled = event.data === 'true'
}
scanFromLabelElement.appendChild(scanFromElement)
document.body.appendChild(scanFromLabelElement)

const scanToLabelElement = document.createElement('label')
scanToLabelElement.innerText = 'to'
let scanToValue
const scanToElement = document.createElement('input')
scanToElement.type = 'number'
scanToElement.min = 1
scanToElement.addEventListener('change', () => {
    if (Number.isNaN(scanToElement.valueAsNumber)) {
        scanToElement.value = minimumValue
        return
    }

    socket.send(JSON.stringify({ scanTo: scanToElement.valueAsNumber }))
})
url.pathname = 'scanToValue'
const scanToValueSocket = new WebSocket(url)
scanToValueSocket.onmessage = event => {
    scanToElement.value = event.data
    scanToValue = scanToElement.value
}
url.pathname = 'scanToDisabled'
const scanToDisabledSocket = new WebSocket(url)
scanToDisabledSocket.onmessage = event => {
    scanToElement.disabled = event.data === 'true'
}
scanToLabelElement.appendChild(scanToElement)
document.body.appendChild(scanToLabelElement)


const scanNumLabelElement = document.createElement('label')
scanNumLabelElement.innerText = 'num'
let scanNumValue
const scanNumElement = document.createElement('input')
scanNumElement.type = 'number'
scanNumElement.min = 1
scanNumElement.addEventListener('change', () => {
    if (Number.isNaN(scanNumElement.valueAsNumber)) {
        scanNumElement.value = minimumValue
        return
    }

    socket.send(JSON.stringify({ scanNum: scanNumElement.valueAsNumber }))
})
url.pathname = 'scanNumValue'
const scanNumValueSocket = new WebSocket(url)
scanNumValueSocket.onmessage = event => {
    scanNumElement.value = event.data
    scanFromValue = scanNumElement.value
}
url.pathname = 'scanNumDisabled'
const scanNumDisabledSocket = new WebSocket(url)
scanNumDisabledSocket.onmessage = event => {
    scanNumElement.disabled = event.data === 'true'
}
scanNumLabelElement.appendChild(scanNumElement)
document.body.appendChild(scanNumLabelElement)

const scanStartButtonElement = document.createElement('input')
scanStartButtonElement.type = 'button'
scanStartButtonElement.value = 'scan'
scanStartButtonElement.style.width = '130px'
scanStartButtonElement.onclick = () => {
    socket.send(JSON.stringify({ scannerIsBusy: true }))
}
url.pathname = 'scanStartButtonDisabled'
const scanStartButtonDisabledSocket = new WebSocket(url)
scanStartButtonDisabledSocket.onmessage = event => {
    scanStartButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(scanStartButtonElement)

const scanStopButtonElement = document.createElement('input')
scanStopButtonElement.type = 'button'
scanStopButtonElement.value = 'scan stop'
scanStopButtonElement.style.width = '130px'
scanStopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ scannerIsBusy: false }))
}
url.pathname = 'scanStopButtonDisabled'
const scanStopButtonDisabledSocket = new WebSocket(url)
scanStopButtonDisabledSocket.onmessage = event => {
    scanStopButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(scanStopButtonElement)


const randomNumberElement = document.createElement('p')
url.pathname = 'randomNumberInnerText'
const randomNumberInnerTextSocket = new WebSocket(url)
randomNumberInnerTextSocket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
document.body.appendChild(randomNumberElement)

const histogramSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
histogramSVGElement.setAttribute('width', '400')
histogramSVGElement.setAttribute('height', '300')
histogramSVGElement.setAttribute('viewBox', '0 0 560 420')
url.pathname = 'histogramSVGInnerHTML'
const histogramSVGInnerHTMLSocket = new WebSocket(url)
histogramSVGInnerHTMLSocket.onmessage = event => {
    histogramSVGElement.innerHTML = event.data
}
document.body.appendChild(histogramSVGElement)

const timeSeriesSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
timeSeriesSVGElement.setAttribute('width', '400')
timeSeriesSVGElement.setAttribute('height', '300')
timeSeriesSVGElement.setAttribute('viewBox', '0 0 560 420')
url.pathname = 'timeSeriesSVGInnerHTML'
const timeSeriesSVGInnerHTMLSocket = new WebSocket(url)
timeSeriesSVGInnerHTMLSocket.onmessage = event => {
    timeSeriesSVGElement.innerHTML = event.data
}
document.body.appendChild(timeSeriesSVGElement)

