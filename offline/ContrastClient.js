const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
/** @type {Map<string,function>} */
const listeners = new Map()
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        listeners.get(key)?.(value)
    }
})

/** @type {HTMLSelectElement} */
const listboxElement = document.createElement('select')
listboxElement.size = 20
listboxElement.style.position = 'absolute'
listboxElement.style.whiteSpace = 'pre-wrap'
listboxElement.style.width = '200px'
listboxElement.style.height = `${window.innerHeight - 8 * 2}px`
listboxElement.addEventListener('change', () => {
    socket.send(JSON.stringify({ hdf5ReaderFileName: listboxElement.options[listboxElement.selectedIndex].innerText }))
})
listeners.set('hdf5FileNamesInnerHTML', (/** @type {string} */arg) => { listboxElement.innerHTML = arg })
document.body.appendChild(listboxElement)

/** @type {SVGElement} */
const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgElement.setAttribute('width', '400')
svgElement.setAttribute('height', '300')
svgElement.setAttribute('viewBox', '0 0 560 420')
svgElement.style.marginLeft = '208px'
listeners.set('svgInnerHTML', (/** @type {string} */arg) => { svgElement.innerHTML = arg })
document.body.appendChild(svgElement)

// socket.onmessage = (/** @type {MessageEvent} */event) => {
//     if (listboxElement.options.length === 0) {
//         listboxElement.innerHTML = event.data
//     } else {
//         svgElement.innerHTML = event.data
//     }
// }
