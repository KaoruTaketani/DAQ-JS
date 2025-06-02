const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {HTMLInputElement} */
const offsetElement = document.createElement('input')
offsetElement.type = 'number'
offsetElement.style.marginTop = '508px'
offsetElement.style.position = 'absolute'
offsetElement.min = '0'
socket.addEventListener('message', event => {
    const key = 'pairedEventOffsetValue'
    if (!event.data.startsWith(`{"${key}":`)) return
    offsetElement.value = JSON.parse(event.data)[key]
})
offsetElement.onchange = () => {
    const value = parseInt(offsetElement.value)
    if (!Number.isInteger(value)) return
    socket.send(JSON.stringify({ pairedEventOffset: value }))
}
document.body.appendChild(offsetElement)

/** @type {HTMLSelectElement} */
const fileNamesElement = document.createElement('select')
fileNamesElement.size = 20
fileNamesElement.style.position = 'absolute'
fileNamesElement.style.width = '150px'
fileNamesElement.style.height = `500px`
socket.addEventListener('message', event => {
    const key = 'edrFileNamesInnerHTML'
    if (!event.data.startsWith(`{"${key}":`)) return
    fileNamesElement.innerHTML = JSON.parse(event.data)[key]
})
fileNamesElement.onchange = () => {
    socket.send(JSON.stringify({ edrReaderFileName: fileNamesElement.selectedOptions[0].innerText }))
}
document.body.appendChild(fileNamesElement)

/** @type {HTMLDivElement} */
const messageElement = document.createElement('div')
// messageElement.style.marginTop = '608px'
// messageElement.style.position = 'absolute'
messageElement.style.marginLeft = '158px'
socket.addEventListener('message', event => {
    const key = 'pairedEventMessageInnerText'
    if (!event.data.startsWith(`{"${key}":"`)) return
    messageElement.innerText = JSON.parse(event.data)[key]
})
document.body.appendChild(messageElement)

/** @type {HTMLTableElement} */
const tableElement = document.createElement('table')
tableElement.style.marginLeft = '158px'
socket.addEventListener('message', event => {
    const key = 'pairedEventTableInnerHTML'
    if (!event.data.startsWith(`{"${key}":`)) return
    tableElement.innerHTML = JSON.parse(event.data)[key]
})
document.body.appendChild(tableElement)

