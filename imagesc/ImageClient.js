const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    (element => {
        element.type = 'button'
        element.value = 'make'
        element.style.width = '64px'
        element.onclick = () => {
            socket.send(Math.random())
        }
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.width = 256
    element.height = 256
    const imageElement = new Image()
    imageElement.onload = () => {
        const ctx = element.getContext("2d")
        if (!ctx) return
        ctx.drawImage(imageElement, 0, 0, 256, 256)
    }
    socket.onmessage = event => {
        imageElement.src = event.data
    }
})(document.body.appendChild(document.createElement('canvas')));


