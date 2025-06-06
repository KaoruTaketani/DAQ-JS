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
listboxElement.multiple = true
listboxElement.style.position = 'absolute'
listboxElement.style.whiteSpace = 'pre-wrap'
listboxElement.style.width = '200px'
listboxElement.style.height = `${window.innerHeight - 8 * 2}px`
listboxElement.onchange = () => {
    socket.send(JSON.stringify({ tableMakerColumns: Array.from(listboxElement.selectedOptions).map(option => option.innerText) }))
}
listeners.set('hdf5AttributesInnerHTML', (/** @type {string} */arg) => {
    listboxElement.innerHTML = arg
    listboxElement.dispatchEvent(new Event('change'))
})
document.body.appendChild(listboxElement)


/** @type {HTMLTableElement} */
const tableElement = document.createElement('table')
tableElement.style.marginLeft = '208px'
listeners.set('tableInnerHTML', (/** @type {string} */arg) => { tableElement.innerHTML = arg })
document.body.appendChild(tableElement)

