const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

const histogramSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
histogramSVGElement.setAttribute('width', '400')
histogramSVGElement.setAttribute('height', '300')
histogramSVGElement.setAttribute('viewBox', '0 0 560 420')
histogramSVGElement.ondblclick = () => {
    dialogElement.showModal()
}
url.pathname = 'histogramSVGInnerHTML'
const histogramSVGInnerHTMLSocket = new WebSocket(url)
histogramSVGInnerHTMLSocket.onmessage = event => {
    histogramSVGElement.innerHTML = event.data
}
document.body.appendChild(histogramSVGElement)

const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement)

const downloadSVGButtonElement = document.createElement('input')
downloadSVGButtonElement.type = 'button'
downloadSVGButtonElement.value = 'download svg'
downloadSVGButtonElement.style.width = '130px'
downloadSVGButtonElement.style.display = 'block'
const svgLinkElement = document.createElement('a')
downloadSVGButtonElement.onclick = () => {
    svgLinkElement.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(
        `<svg xmlns="http://www.w3.org/2000/svg" >${histogramSVGElement.innerHTML}</svg>`
    ))
    svgLinkElement.setAttribute('download', 'histogram.svg')
    svgLinkElement.click()
}
dialogElement.appendChild(downloadSVGButtonElement)

const closeButtonElement = document.createElement('input')
closeButtonElement.type = 'button'
closeButtonElement.value = 'close'
closeButtonElement.style.width = '130px'
closeButtonElement.style.display = 'block'
closeButtonElement.onclick = () => {
    dialogElement.close()
}
dialogElement.appendChild(closeButtonElement)


