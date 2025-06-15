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

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

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
histogramSVGElement.ondblclick = () => {
    dialogElement.showModal()
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

const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement)

const downloadHDF5ButtonElement = document.createElement('input')
downloadHDF5ButtonElement.type = 'button'
downloadHDF5ButtonElement.value = 'download hdf5'
downloadHDF5ButtonElement.style.width = '130px'
downloadHDF5ButtonElement.style.display = 'block'
const hdf5LinkElement = document.createElement('a')
url.pathname = 'hdf5LinkHref'
const hdf5LinkHrefSocket = new WebSocket(url)
hdf5LinkHrefSocket.onmessage = event => {
    hdf5LinkElement.href = event.data
}
downloadHDF5ButtonElement.onclick = () => {
    hdf5LinkElement.setAttribute('download', 'histogram.h5')
    hdf5LinkElement.click()
}
dialogElement.appendChild(downloadHDF5ButtonElement)

const closeButtonElement = document.createElement('input')
closeButtonElement.type = 'button'
closeButtonElement.value = 'close'
closeButtonElement.style.width = '130px'
closeButtonElement.style.display = 'block'
closeButtonElement.onclick = () => {
    dialogElement.close()
}
dialogElement.appendChild(closeButtonElement)



