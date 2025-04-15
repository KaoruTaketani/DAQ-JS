const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {HTMLSelectElement} */
const listboxElement = document.createElement('select')
listboxElement.id = 'listbox'
listboxElement.size = 20
listboxElement.style.position = 'absolute'
listboxElement.style.whiteSpace = 'pre-wrap'
listboxElement.style.width = '200px'
listboxElement.style.height = '445px'
listboxElement.addEventListener('change', () => {
    socket.send(listboxElement.options[listboxElement.selectedIndex].innerText)
})
document.body.appendChild(listboxElement)

/** @type {SVGElement} */
const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('width', '400')
svgElement.setAttribute('height', '300')
svgElement.setAttribute('viewBox', '0 0 560 420')
svgElement.style.marginLeft = '208px'
document.body.appendChild(svgElement)

socket.onmessage = (/** @type {MessageEvent} */event) => {
    if (listboxElement.options.length === 0) {
        listboxElement.innerHTML = event.data
    } else {
        svgElement.innerHTML = event.data
    }
}
