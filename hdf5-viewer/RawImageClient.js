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
listeners.set('hdf5FileNamesInnerHTML', (/** @type (string) */ arg) => { listboxElement.innerHTML = arg })
document.body.appendChild(listboxElement)

const cursorElement = document.createElement('p')
cursorElement.style.marginLeft = '208px'
cursorElement.innerText = `cursorOffset: undefined`
document.body.appendChild(cursorElement)

const canvasElement = document.createElement('canvas')
canvasElement.width = 256
canvasElement.height = 256
canvasElement.style.marginLeft = '208px'
canvasElement.onmousemove = (/** @type {MouseEvent} */event) => {
    cursorElement.innerText = `cursorOffset: {x: ${event.offsetX}, y: ${event.offsetY}}`
}
document.body.appendChild(canvasElement)

const imageElement = new Image()
imageElement.onload = () => {
    const ctx = canvasElement.getContext("2d")
    if (!ctx) return
    ctx.drawImage(imageElement, 0, 0, 256, 256)
}
// socket.onmessage = (/** @type {MessageEvent} */event) => {
//     if (listboxElement.options.length === 0) {
//         listboxElement.innerHTML = event.data
//     } else {
//         imageElement.src = event.data
//     }
// }
// on('imageSrc', (/** @type (string) */ arg) => { imageElement.src = arg })
listeners.set('imageSrc', (/** @type (string) */ arg) => { imageElement.src = arg })