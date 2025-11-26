const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    element.type = 'button'
    element.value = 'start'
    element.style.width = '130px'
    element.onclick = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', '/?randomNumberGeneratorIsBusy=true')
        xhr.send()
    }
    url.pathname = 'startButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'stop'
    element.style.width = '130px'
    element.onclick = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', '/?randomNumberGeneratorIsBusy=false')
        xhr.send()
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));

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
    url.pathname = 'histogramImageSrc'
    const srcSocket = new WebSocket(url)
    srcSocket.onmessage = event => {
        console.log('data')
        imageElement.src = event.data
    }
})(document.body.appendChild(document.createElement('canvas')));


