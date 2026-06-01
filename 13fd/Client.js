const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    element.style.display = 'flex'
    element.style.marginBottom = '8px'
    element.innerText = 'zscale';
    (element => {
        element.onchange = () => {
            const arg = element.options[element.selectedIndex].innerText
            const xhr = new XMLHttpRequest()
            xhr.open('PUT', `/?zscale=${arg}`)
            xhr.send()
        }
        url.pathname = 'zscaleInnerHTML'
        const srcSocket = new WebSocket(url)
        srcSocket.onmessage = event => {
            element.innerHTML = event.data
        }
    })(element.appendChild(document.createElement('select')));
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


