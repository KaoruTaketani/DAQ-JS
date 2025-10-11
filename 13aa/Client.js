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
        xhr.open('PUT','/?randomNumberGeneratorIsBusy=true')
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
        xhr.open('PUT','/?randomNumberGeneratorIsBusy=false')
        xhr.send()
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    url.pathname = 'startTimeInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = event => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    url.pathname = 'randomNumberInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = event => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    element.ondblclick = () => {
        dialogElement.showModal()
    }
    url.pathname = 'histogramSVGInnerHTML'
    const innerHTMLSocket = new WebSocket(url)
    innerHTMLSocket.onmessage = event => {
        element.innerHTML = event.data
    }
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

(element => {
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    url.pathname = 'timeSeriesSVGInnerHTML'
    const innerHTMLSocket = new WebSocket(url)
    innerHTMLSocket.onmessage = event => {
        element.innerHTML = event.data
    }
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));





const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement);

(element => {
    element.type = 'button'
    element.value = 'download svg'
    element.style.width = '130px'
    element.style.display = 'block'
    const linkElement = document.createElement('a')
    element.onclick = () => {
        linkElement.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" >${element.innerHTML}</svg>`
        ))
        linkElement.setAttribute('download', 'histogram.svg')
        linkElement.click()
    }
})(dialogElement.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'close'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onclick = () => {
        dialogElement.close()
    }
})(dialogElement.appendChild(document.createElement('input')));




