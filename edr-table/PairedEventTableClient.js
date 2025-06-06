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
})

/** @type {HTMLInputElement} */
const offsetElement = document.createElement('input')
offsetElement.type = 'number'
offsetElement.style.marginTop = '508px'
offsetElement.style.position = 'absolute'
offsetElement.min = '0'
on('offsetValue', (/** @type {string} */ arg) => { offsetElement.value = arg })
offsetElement.onchange = () => {
    const value = parseInt(offsetElement.value)
    if (!Number.isInteger(value)) return
    socket.send(JSON.stringify({ eventOffset: value }))
}
document.body.appendChild(offsetElement)

/** @type {HTMLSelectElement} */
const fileNamesElement = document.createElement('select')
fileNamesElement.size = 20
fileNamesElement.style.position = 'absolute'
fileNamesElement.style.width = '150px'
fileNamesElement.style.height = `500px`
on('edrFileNamesInnerHTML', (/** @type {string} */ arg) => { fileNamesElement.innerHTML = arg })
fileNamesElement.onchange = () => {
    socket.send(JSON.stringify({ edrReaderFileName: fileNamesElement.selectedOptions[0].innerText }))
}
document.body.appendChild(fileNamesElement)

/** @type {HTMLDivElement} */
const messageElement = document.createElement('div')
// messageElement.style.marginTop = '608px'
// messageElement.style.position = 'absolute'
messageElement.style.marginLeft = '158px'
on('messageInnerText', (/** @type {string} */ arg) => { messageElement.innerText = arg })
document.body.appendChild(messageElement)

/** @type {HTMLTableElement} */
const tableElement = document.createElement('table')
tableElement.style.marginLeft = '158px'
on('tableInnerHTML', (/** @type {string} */ arg) => { tableElement.innerHTML = arg })
document.body.appendChild(tableElement)

