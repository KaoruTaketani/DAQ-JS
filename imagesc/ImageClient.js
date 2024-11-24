const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const firstElement = document.createElement('div')
const submitButtonElement = document.createElement('input')
submitButtonElement.type = 'button'
submitButtonElement.value = 'make'
submitButtonElement.style.width = '64px'
submitButtonElement.onclick = () => {
    socket.send(Math.random())
}
firstElement.appendChild(submitButtonElement)
document.body.appendChild(firstElement)


const canvasElement = document.createElement('canvas')
canvasElement.width = 256
canvasElement.height = 256
document.body.appendChild(canvasElement)

const imageElement = new Image()
imageElement.onload = () => {
    const ctx = canvasElement.getContext("2d")
    if (!ctx) return
    ctx.drawImage(imageElement, 0, 0, 256,256)
}
socket.onmessage = event => {
    imageElement.src = event.data
}

