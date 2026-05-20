const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    (element => {
        element.innerText = 'clim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        let worked
        element.type = 'number'
        element.addEventListener('change', () => {
            if (Number.isNaN(element.valueAsNumber)) {
                element.value = worked
                return
            }

            const xhr = new XMLHttpRequest()
            xhr.open('PUT', `/?cmin=${element.value}`)
            xhr.send()
        })
        url.pathname = 'cminValue'
        const valueSocket = new WebSocket(url)
        valueSocket.onmessage = event => {
            element.value = event.data
            worked = element.value
        }
    })(element.appendChild(document.createElement('input')));

    (element => {
        let worked
        element.type = 'number'
        element.addEventListener('change', () => {
            if (Number.isNaN(element.valueAsNumber)) {
                element.value = worked
                return
            }

            const xhr = new XMLHttpRequest()
            xhr.open('PUT', `/?cmax=${element.value}`)
            xhr.send()
        })
        url.pathname = 'cmaxValue'
        const valueSocket = new WebSocket(url)
        valueSocket.onmessage = event => {
            element.value = event.data
            worked = element.value
        }
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

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


