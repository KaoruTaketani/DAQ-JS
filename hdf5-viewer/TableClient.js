const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {Map<string,function>} */
const tableListeners = new Map()
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        tableListeners.get(key)?.(value)
    }
})

/** @type {HTMLDialogElement} */
const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement);

(element => {
    const linkElement = document.createElement('a')
    linkElement.setAttribute('download', `table.csv`)
    tableListeners.set('csvLinkHref', (/** @type {string} */arg) => {
        linkElement.href = arg
    })

    element.type = 'button'
    element.value = 'download'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onclick = () => {
        linkElement.click()
    }
})(dialogElement.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'close'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onclick = () => {
        dialogElement.close()
    }
})(dialogElement.appendChild(document.createElement('input')));

(element => {
    element.size = 20
    element.multiple = true
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.onchange = () => {
        socket.send(JSON.stringify({ tableMakerColumns: Array.from(element.selectedOptions).map(option => option.innerText) }))
    }
    tableListeners.set('hdf5AttributesInnerHTML', (/** @type {string} */arg) => {
        element.innerHTML = arg
        element.dispatchEvent(new Event('change'))
    })
})(document.body.appendChild(document.createElement('select')));

(element => {
    element.style.marginLeft = '208px'
    tableListeners.set('tableInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
    element.ondblclick = () => {
        dialogElement.showModal()
    }
})(document.body.appendChild(document.createElement('table')));

