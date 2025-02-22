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
startButtonElement.style.display = 'block'
startButtonElement.onclick = () => {
    socket.send(JSON.stringify({ neunetReaderIsBusy: true }))
}
url.pathname = 'startButtonDisabled'
const startButtonDisabledSocket = new WebSocket(url)
startButtonDisabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
    startButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(startButtonElement)


const stopButtonElement = document.createElement('input')
stopButtonElement.type = 'button'
stopButtonElement.value = 'stop'
stopButtonElement.style.width = '130px'
stopButtonElement.style.display = 'block'
stopButtonElement.onclick = () => {
    socket.send(JSON.stringify({ neunetReaderIsBusy: false }))
}
url.pathname = 'stopButtonDisabled'
const stopButtonDisabledSocket = new WebSocket(url)
stopButtonDisabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
    stopButtonElement.disabled = event.data === 'true'
}
document.body.appendChild(stopButtonElement)

const usePresetElement = document.createElement('input')
usePresetElement.type = 'checkbox'
usePresetElement.onclick = () => {
    socket.send(JSON.stringify({ usePreset: usePresetElement.checked }))
}
url.pathname = 'usePresetChecked'
const usePresetCheckedSocket = new WebSocket(url)
usePresetCheckedSocket.onmessage = (/** @type {MessageEvent} */event) => {
    usePresetElement.checked = event.data === 'true'
}
url.pathname = 'usePresetDisabled'
const usePresetDisabledSocket = new WebSocket(url)
usePresetDisabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
    usePresetElement.disabled = event.data === 'true'
}
const usePresetLabelElement = document.createElement('label')
usePresetLabelElement.style.display = 'block'
usePresetLabelElement.appendChild(usePresetElement)
usePresetLabelElement.appendChild(document.createTextNode('use preset'))
document.body.appendChild(usePresetLabelElement)



const presetElement = document.createElement('input')
presetElement.type = 'number'
presetElement.style.width = '130px'
presetElement.style.display = 'block'
presetElement.onchange = () => {
    const preset = parseInt(presetElement.value)

    if (Number.isNaN(preset) || preset < 0) {
        startButtonElement.disabled = true
    } else {
        startButtonElement.disabled = false
        socket.send(JSON.stringify({ preset: preset }))
    }
}
url.pathname = 'presetDisabled'
const presetDsiabledSocket = new WebSocket(url)
presetDsiabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
    presetElement.disabled = event.data === 'true'
}
url.pathname = 'presetValue'
const presetValueSocket = new WebSocket(url)
presetValueSocket.onmessage = (/** @type {MessageEvent} */event) => {
    presetElement.value = event.data
}
document.body.appendChild(presetElement)

const saveFileElement = document.createElement('input')
saveFileElement.type = 'checkbox'
saveFileElement.onclick = () => {
    socket.send(JSON.stringify({ saveFile: saveFileElement.checked }))
}
url.pathname = 'saveFileDisabled'
const saveFileDisabledSocket = new WebSocket(url)
saveFileDisabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
    saveFileElement.disabled = event.data === 'true'
}
const saveFileLabelElement = document.createElement('label')
saveFileLabelElement.style.display = 'block'
saveFileLabelElement.appendChild(saveFileElement)
saveFileLabelElement.appendChild(document.createTextNode('save file'))
document.body.appendChild(saveFileLabelElement)



const kickerPulseCountElement = document.createElement('p')
url.pathname = 'kickerPulseCountInnerText'
const kickerPulseCountInnerTextSocket = new WebSocket(url)
kickerPulseCountInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    kickerPulseCountElement.innerText = event.data
}
document.body.appendChild(kickerPulseCountElement)

const channel0CountElement = document.createElement('p')
url.pathname = 'channel0CountInnerText'
const channel0CountInnerTextSocket = new WebSocket(url)
channel0CountInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    channel0CountElement.innerText = event.data
}
document.body.appendChild(channel0CountElement)

const channel1CountElement = document.createElement('p')
url.pathname = 'channel1CountInnerText'
const channel1CountInnerTextSocket = new WebSocket(url)
channel1CountInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    channel1CountElement.innerText = event.data
}
document.body.appendChild(channel1CountElement)


const neutronCountElement = document.createElement('p')
url.pathname = 'neutronCountInnerText'
const neutronCountInnerTextSocket = new WebSocket(url)
neutronCountInnerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
    neutronCountElement.innerText = event.data
}
document.body.appendChild(neutronCountElement)


const canvasElement = document.createElement('canvas')
canvasElement.width = 256
canvasElement.height = 256
document.body.appendChild(canvasElement)

const imageElement = new Image()
imageElement.onload = () => {
    const ctx = canvasElement.getContext("2d")
    if (!ctx) return
    ctx.drawImage(imageElement, 0, 0, 256,256)
}
url.pathname = 'imageSrc'
const imageSrcSocket = new WebSocket(url)
imageSrcSocket.onmessage = (/** @type {MessageEvent} */event) => {
    imageElement.src = event.data
}

