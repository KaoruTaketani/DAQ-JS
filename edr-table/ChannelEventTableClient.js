const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
/** @type {function[]} */
const messageListeners = []
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    messageListeners.forEach(listener => { listener(arg) })
})

/** @type {HTMLInputElement} */
const offsetElement = document.createElement('input')
offsetElement.type = 'number'
offsetElement.style.marginTop = '508px'
offsetElement.style.position = 'absolute'
offsetElement.min = '0'
messageListeners.push((/** @type {object} */arg) => {
    //     Object.entries(arg).forEach([value, key]=> {
    //         if(key!== 'offsetValue')return
    // })
    for (const [key, value] of Object.entries(arg)) {
        // console.log(`${key}: ${value}`);
        if (key !== 'offsetValue') return
        offsetElement.value = value
    }
})
// socket.addEventListener('message', event => {
//     const key = 'offsetValue'
//     if (!event.data.startsWith(`{"${key}":`)) return
//     offsetElement.value = JSON.parse(event.data)[key]
// })
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
messageListeners.push((/** @type {object} */arg) => {
    for (const [key, value] of Object.entries(arg)) {
        // console.log(`${key}: ${value}`);
        if (key !== 'edrFileNamesInnerHTML') return
        fileNamesElement.innerHTML = value
    }
})
// socket.addEventListener('message', event => {
//     const key = 'edrFileNamesInnerHTML'
//     if (!event.data.startsWith(`{"${key}":`)) return
//     fileNamesElement.innerHTML = JSON.parse(event.data)[key]
// })
fileNamesElement.onchange = () => {
    socket.send(JSON.stringify({ edrReaderFileName: fileNamesElement.selectedOptions[0].innerText }))
}
document.body.appendChild(fileNamesElement)

/** @type {HTMLDivElement} */
const messageElement = document.createElement('div')
// messageElement.style.marginTop = '608px'
// messageElement.style.position = 'absolute'
messageElement.style.marginLeft = '158px'
messageListeners.push((/** @type {object} */arg) => {
    for (const [key, value] of Object.entries(arg)) {
        // console.log(`${key}: ${value}`);
        if (key !== 'messageInnerText') return
        messageElement.innerText = value
    }
})
// socket.addEventListener('message', event => {
//     const key = 'messageInnerText'
//     if (!event.data.startsWith(`{"${key}":"`)) return
//     messageElement.innerText = JSON.parse(event.data)[key]
// })
document.body.appendChild(messageElement)

/** @type {HTMLTableElement} */
const tableElement = document.createElement('table')
tableElement.style.marginLeft = '158px'
messageListeners.push((/** @type {object} */arg) => {
    for (const [key, value] of Object.entries(arg)) {
        // console.log(`${key}: ${value}`);
        if (key !== 'tableInnerHTML') return
        tableElement.innerHTML = value
    }
})
// socket.addEventListener('message', event => {
//     const key = 'tableInnerHTML'
//     if (!event.data.startsWith(`{"${key}":`)) return
//     tableElement.innerHTML = JSON.parse(event.data)[key]
// })
document.body.appendChild(tableElement)

