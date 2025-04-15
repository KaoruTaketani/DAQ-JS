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

/** @type {HTMLDivElement} */
const divElement = document.createElement('div')
divElement.style.marginLeft = '208px'
document.body.appendChild(divElement)

socket.onmessage = (/** @type {MessageEvent} */event) => {
    if (listboxElement.options.length === 0) {
        listboxElement.innerHTML = event.data
    } else {
        divElement.innerHTML = event.data
    }
}
