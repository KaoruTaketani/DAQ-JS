const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = window.id
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {HTMLSelectElement} */
const listboxElement = document.createElement('select')
listboxElement.id = 'listbox'
listboxElement.size = 20
listboxElement.multiple = true
listboxElement.style.position = 'absolute'
listboxElement.style.whiteSpace = 'pre-wrap'
listboxElement.style.width = '200px'
listboxElement.style.height = '445px'
listboxElement.addEventListener('change', () => {
    socket.send(JSON.stringify(Array.from(listboxElement.selectedOptions).map(option => option.innerText)))
})
document.body.appendChild(listboxElement)

/** @type {HTMLSelectElement} */
const divElement = document.createElement('div')
divElement.style.marginLeft = '208px'
document.body.appendChild(divElement)

socket.onmessage = event => {
    if (listboxElement.options.length === 0) {
        listboxElement.innerHTML = event.data
    } else {
        divElement.innerHTML = event.data
    }
}
