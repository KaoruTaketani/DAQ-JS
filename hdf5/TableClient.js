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

/** @type {HTMLDialogElement} */
const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement)

/** @type {HTMLAnchorElement} */
const csvLinkElement = document.createElement('a')
csvLinkElement.setAttribute('download', `table.csv`)
listeners.set('csvLinkHref', (/** @type {string} */arg) => {
    csvLinkElement.href = arg
})

/** @type {HTMLInputElement} */
const downloadCSVButtonElement = document.createElement('input')
downloadCSVButtonElement.type = 'button'
downloadCSVButtonElement.value = 'download'
downloadCSVButtonElement.style.width = '130px'
downloadCSVButtonElement.style.display = 'block'
downloadCSVButtonElement.onclick = () => {
    csvLinkElement.click()
}
dialogElement.appendChild(downloadCSVButtonElement)

/** @type {HTMLInputElement} */
const closeButtonElement = document.createElement('input')
closeButtonElement.type = 'button'
closeButtonElement.value = 'close'
closeButtonElement.style.width = '130px'
closeButtonElement.style.display = 'block'
closeButtonElement.onclick = () => {
    dialogElement.close()
}
dialogElement.appendChild(closeButtonElement)

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
tableElement.ondblclick = () => {
    dialogElement.showModal()
}
document.body.appendChild(tableElement)

