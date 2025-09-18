const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
/** @type {Map<string,function>} */
const listeners = new Map()
/**
 * @param {string} channel 
 * @param {function} listener 
 */
function on(channel, listener) {
    listeners.set(channel, listener)
}
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        listeners.get(key)?.(value)
    }
});

(element => {
    element.type = 'number'
    element.style.marginTop = '508px'
    element.style.position = 'absolute'
    element.min = '0'
    on('offsetValue', (/** @type {string} */ arg) => { element.value = arg })
    element.onchange = () => {
        const value = parseInt(element.value)
        if (!Number.isInteger(value)) return
        socket.send(JSON.stringify({ eventOffset: value }))
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.width = '150px'
    element.style.height = `500px`
    on('edrFileNamesInnerHTML', (/** @type {string} */ arg) => { element.innerHTML = arg })
    element.onchange = () => {
        socket.send(JSON.stringify({ edrReaderFileName: element.selectedOptions[0].innerText }))
    }
})(document.body.appendChild(document.createElement('select')));

(element => {
    element.style.marginLeft = '158px'
    on('messageInnerText', (/** @type {string} */ arg) => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '158px'
    on('tableInnerHTML', (/** @type {string} */ arg) => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('table')));

