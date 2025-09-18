const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const startButtonElement = document.createElement('input');
(element => {
    element.type = 'button'
    element.value = 'start'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onclick = () => {
        socket.send(JSON.stringify({ neunetReaderIsBusy: true }))
    }
    url.pathname = 'startButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.disabled = event.data === 'true'
    }

})(document.body.appendChild(startButtonElement));

(element => {
    element.type = 'button'
    element.value = 'stop'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onclick = () => {
        socket.send(JSON.stringify({ neunetReaderIsBusy: false }))
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));


(element => {
    (element => {
        element.type = 'checkbox'
        element.onclick = () => {
            socket.send(JSON.stringify({ usePreset: element.checked }))
        }
        url.pathname = 'usePresetChecked'
        const checkedSocket = new WebSocket(url)
        checkedSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.checked = event.data === 'true'
        }
        url.pathname = 'usePresetDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));
    element.style.display = 'block'

    element.appendChild(document.createTextNode('use preset'))

})(document.body.appendChild(document.createElement('label')));

(element => {
    element.type = 'number'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onchange = () => {
        const preset = parseInt(element.value)

        if (Number.isNaN(preset) || preset < 0) {
            startButtonElement.disabled = true
        } else {
            startButtonElement.disabled = false
            socket.send(JSON.stringify({ preset: preset }))
        }
    }
    url.pathname = 'presetDisabled'
    const dsiabledSocket = new WebSocket(url)
    dsiabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.disabled = event.data === 'true'
    }
    url.pathname = 'presetValue'
    const valueSocket = new WebSocket(url)
    valueSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.value = event.data
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    (element => {
        element.type = 'checkbox'
        element.onclick = () => {
            socket.send(JSON.stringify({ saveToEDR: element.checked }))
        }
        url.pathname = 'saveToEDRDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));
    element.style.display = 'block'
    element.appendChild(document.createTextNode('save to edr'))
})(document.body.appendChild(document.createElement('label')));

(element => {
    url.pathname = 'edrFilePathInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    url.pathname = 'kickerPulseCountInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    url.pathname = 'channel0CountInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    url.pathname = 'channel1CountInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    url.pathname = 'neutronCountInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

const cursorElement = document.createElement('p')
cursorElement.innerText = `cursorOffset: undefined`
document.body.appendChild(cursorElement);

(element => {
    element.width = 256
    element.height = 256
    element.onmousemove = (/** @type {MouseEvent} */event) => {
        cursorElement.innerText = `cursorOffset: {x: ${event.offsetX}, y: ${event.offsetY}}`
    }
    const imageElement = new Image()
    imageElement.onload = () => {
        const ctx = element.getContext("2d")
        if (!ctx) return
        ctx.drawImage(imageElement, 0, 0, 256, 256)
    }
    url.pathname = 'imageSrc'
    const imageSrcSocket = new WebSocket(url)
    imageSrcSocket.onmessage = (/** @type {MessageEvent} */event) => {
        imageElement.src = event.data
    }
})(document.body.appendChild(document.createElement('canvas')));

