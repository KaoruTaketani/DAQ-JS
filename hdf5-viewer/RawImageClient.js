const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {Map<string,function>} */
const imageListeners = new Map()
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        imageListeners.get(key)?.(value)
    }
});

(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.addEventListener('change', () => {
        socket.send(JSON.stringify({ hdf5ReaderFileName: element.options[element.selectedIndex].innerText }))
    })
    imageListeners.set('hdf5FileNamesInnerHTML', (/** @type (string) */ arg) => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

const cursorElement = document.createElement('p');
(element => {
    element.style.marginLeft = '208px'
    element.innerText = `cursorOffset: undefined`
})(document.body.appendChild(cursorElement));

(element => {
    element.width = 256
    element.height = 256
    element.style.marginLeft = '208px'
    element.onmousemove = (/** @type {MouseEvent} */event) => {
        cursorElement.innerText = `cursorOffset: {x: ${event.offsetX}, y: ${event.offsetY}}`
    }
    const imageElement = new Image()
    imageElement.onload = () => {
        const ctx = element.getContext("2d")
        if (!ctx) return
        ctx.drawImage(imageElement, 0, 0, 256, 256)
    }
    imageListeners.set('imageSrc', (/** @type (string) */ arg) => { imageElement.src = arg })
})(document.body.appendChild(document.createElement('canvas')));

