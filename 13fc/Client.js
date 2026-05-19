const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const divElement = document.body.appendChild(document.createElement('div'));

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
    element.addEventListener('mousemove', event => {
        const bounding = element.getBoundingClientRect();
        const x = event.clientX - bounding.left;
        const y = event.clientY - bounding.top;
        const ctx = element.getContext("2d")
        if (!ctx) return
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;

        divElement.innerText = `red: ${data[0]}, green: ${data[1]}, blue: ${data[2]}, alpha: ${data[3]}`
    })
})(document.body.appendChild(document.createElement('canvas')));


