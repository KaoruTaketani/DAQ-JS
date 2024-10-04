const totalElement = document.createElement('p')
totalElement.innerText = 'total is NaN'
document.body.appendChild(totalElement)

const startTimeElement = document.createElement('p')
startTimeElement.innerText = 'start time is undefined'
document.body.appendChild(startTimeElement)

const cursorElement = document.createElement('p')
cursorElement.innerText = 'cursor: undefined'
document.body.appendChild(cursorElement)

const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('width', '400')
svgElement.setAttribute('height', '300')
svgElement.onmousemove = ev => {
    const axes = svgElement.getElementById("axes")
    if (axes === undefined) return
    // console.log(axes.dataset)
    // width: 400, viewBoxWidth: 560
    // height: 300, viewBoxHeight: 420
    // so, horizontally scale 400/560 and vertically scale 300/420
    const offsetX = ev.offsetX * 560 / 400
    const ratioX = (offsetX - axes.dataset.x0) / (axes.dataset.x1 - axes.dataset.x0)
    if (ratioX < 0 || ratioX > 1) return

    const offsetY = ev.offsetY * 420 / 300
    const ratioY = (offsetY - axes.dataset.y1) / (axes.dataset.y0 - axes.dataset.y1)
    if (ratioY < 0 || ratioY > 1) return

    const x = Number(axes.dataset.xmin) + ratioX * (axes.dataset.xmax - axes.dataset.xmin)
    const y = Number(axes.dataset.ymin) + (1 - ratioY) * (axes.dataset.ymax - axes.dataset.ymin)
    // console.log(`ratioX: ${ratioX}, ratioY: ${ratioY}, x: ${x}, y: ${y}`)
    cursorElement.innerText = `cursor: {x: ${x}, y: ${y}}`
}
svgElement.ondblclick = () => {
    dialogElement.showModal()
}
document.body.appendChild(svgElement)

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
        `<svg xmlns="http://www.w3.org/2000/svg" >${svgElement.innerHTML}</svg>`
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



const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    const msg = JSON.parse(event.data)

    if (msg.key === 'totalInnerText')
        totalElement.innerText = msg.value
    if (msg.key === 'startTimeInnerText')
        startTimeElement.innerText = msg.value
    if (msg.key === 'svgInnerHTML')
        svgElement.innerHTML = msg.value
    if (msg.key === 'svgViewBox')
        svgElement.setAttribute('viewBox', msg.value)
}
