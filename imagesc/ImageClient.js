const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const firstElement = document.createElement('div')
const makeButtonElement = document.createElement('input')
makeButtonElement.type = 'button'
makeButtonElement.value = 'make'
makeButtonElement.style.width = '64px'
makeButtonElement.onclick = () => {
    socket.send(Math.random())
}
firstElement.appendChild(makeButtonElement)
document.body.appendChild(firstElement)


const canvasElement = document.createElement('canvas')
canvasElement.width = 64
canvasElement.height = 64
document.body.appendChild(canvasElement)

const imageElement = new Image()
imageElement.onload = () => {
    const ctx = canvasElement.getContext("2d")
    if (!ctx) return
    ctx.drawImage(imageElement, 0, 0, 64, 64)
}
socket.onmessage = event => {
    imageElement.src = event.data
}

