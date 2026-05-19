const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    element.innerText = 'isLog';
    (element => {
        element.type = 'checkbox'
        element.checked = true
        element.onchange = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT', `/?isLog=${element.checked}`)
            xhr.send()
        }
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.width = 256
    element.height = 256
    const imageElement = new Image()
    imageElement.onload = () => {
        const ctx = element.getContext("2d")
        if (!ctx) return
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(imageElement, 0, 0, 256, 256)
    }
    url.pathname = 'imageSrc'
    const srcSocket = new WebSocket(url)
    srcSocket.onmessage = event => {
        imageElement.src = event.data
    }
})(document.body.appendChild(document.createElement('canvas')));


