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
        xhr.open('PUT','/?ringBufferDestinationState=busy')
        xhr.send()
    }
    url.pathname = 'startButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'stop'
    element.style.width = '130px'
    element.onclick = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT','/?ringBufferDestinationState=idle')
        xhr.send()
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'get'
    element.style.width = '130px'
    element.onclick = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT','/?ringBufferMessage=get')
        xhr.send()
    }
    url.pathname = 'getButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    url.pathname = 'ringBufferDataInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = event => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

