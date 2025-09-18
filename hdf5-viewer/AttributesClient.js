const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {Map<string,function>} */
const attributesListeners = new Map()
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        attributesListeners.get(key)?.(value)
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
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
    attributesListeners.set('hdf5FileNamesInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

(element => {
    element.style.marginLeft = '208px'
    attributesListeners.set('divInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('div')));
