const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    element.width = 256
    element.height = 256
    url.pathname = 'imageSrc'
    const srcSocket = new WebSocket(url)
    srcSocket.onmessage = event => {
        element.src = event.data
    }
})(document.body.appendChild(document.createElement('img')));

