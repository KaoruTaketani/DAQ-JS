const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const totalElement = document.createElement('p')
url.pathname = 'totalInnerText'
const totalInnerTextSocket = new WebSocket(url)
totalInnerTextSocket.onmessage = event => {
    totalElement.innerText = event.data
}
document.body.appendChild(totalElement)

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

const cursorElement = document.createElement('p')
cursorElement.innerText = 'cursor: undefined'
document.body.appendChild(cursorElement)

const histogramSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
histogramSVGElement.setAttribute('width', '400')
histogramSVGElement.setAttribute('height', '300')
histogramSVGElement.setAttribute('viewBox', '0 0 560 420')
url.pathname = 'histogramSVGInnerHTML'
const histogramSVGInnerHTMLSocket = new WebSocket(url)
histogramSVGInnerHTMLSocket.onmessage = event => {
    histogramSVGElement.innerHTML = event.data
}
histogramSVGElement.onmousemove = ev => {
    const axes = document.getElementById("axes")

    const xInPixels = ev.offsetX * 560 / 400
    const xInNormalized = (xInPixels - axes.dataset.xminInPixels)
        / (axes.dataset.xmaxInPixels - axes.dataset.xminInPixels)
    const xInData = Number(axes.dataset.xminInData)
        + xInNormalized * (axes.dataset.xmaxInData - axes.dataset.xminInData)

    const yInPixels = ev.offsetY * 420 / 300
    const yInNormalized = (axes.dataset.yminInPixels - yInPixels)
        / (axes.dataset.yminInPixels - axes.dataset.ymaxInPixels)
    const yInData = Number(axes.dataset.yminInData)
        + yInNormalized * (axes.dataset.ymaxInData - axes.dataset.yminInData)

    if (xInNormalized < 0 || xInNormalized > 1) {
        cursorElement.innerText = `cursor: undefined`
        return
    }
    if (yInNormalized < 0 || yInNormalized > 1) {
        cursorElement.innerText = `cursor: undefined`
        return
    }

    cursorElement.innerText = `cursor: {x: ${xInData}, y: ${yInData}}`
}
histogramSVGElement.ondblclick = () => {
    dialogElement.showModal()
}
// document.body.appendChild(svgElement)
const foreignElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
foreignElement.setAttribute('width', '400')
foreignElement.setAttribute('height', '300')
foreignElement.appendChild(histogramSVGElement)
const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
lineElement.setAttribute('stroke', 'red')
const overlayElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
overlayElement.setAttribute('width', '400')
overlayElement.setAttribute('height', '300')
overlayElement.appendChild(foreignElement)
overlayElement.appendChild(lineElement)
// lineElement.innerHTML=`<polyline points="0,0 400,30" stroke="black" fill="none" />`
// lineElement.setAttribute('points', '200,0 200,400')
// overlayElement.onmousemove = ev => {
//     // const xInPixels = ev.offsetX * 560 / 400
//     // const yInPixels = ev.offsetY * 420 / 300
//     if (ev.offsetX < 120)
//         lineElement.removeAttribute('points')
//     else
//         lineElement.setAttribute('points', `${ev.offsetX},0 ${ev.offsetX},420`)
// }
document.body.appendChild(overlayElement)

const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement)

const svgLinkElement = document.createElement('a')
const downloadSVGButtonElement = document.createElement('input')
downloadSVGButtonElement.type = 'button'
downloadSVGButtonElement.value = 'download svg'
downloadSVGButtonElement.style.width = '130px'
downloadSVGButtonElement.style.display = 'block'
downloadSVGButtonElement.onclick = () => {
    svgLinkElement.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" >${histogramSVGElement.innerHTML}</svg>`))
    svgLinkElement.setAttribute('download', 'histogram.svg')
    svgLinkElement.click()
}
dialogElement.appendChild(downloadSVGButtonElement)

const hdf5LinkElement = document.createElement('a')
const downloadHDF5ButtonElement = document.createElement('input')
downloadHDF5ButtonElement.type = 'button'
downloadHDF5ButtonElement.value = 'download hdf5'
downloadHDF5ButtonElement.style.width = '130px'
downloadHDF5ButtonElement.style.display = 'block'
downloadHDF5ButtonElement.onclick = () => {
    const url = new URL(import.meta.url)
    hdf5LinkElement.setAttribute('href', `${url.origin}/histogram.h5`)
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



