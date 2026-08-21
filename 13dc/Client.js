import polyfit from './polyfit.js'
import polyval from './polyval.js'
import isbetween from './isbetween.js'

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
        xhr.open('PUT', '/?randomNumberGeneratorDestinationState=busy')
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
        xhr.open('PUT', '/?randomNumberGeneratorDestinationState=idle')
        xhr.send()
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data
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

const cursorElement = document.createElement('p')
cursorElement.innerText = 'cursor: undefined'
document.body.appendChild(cursorElement);

(element => {
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    url.pathname = 'histogramSVGInnerHTML'
    const innerHTMLSocket = new WebSocket(url)
    innerHTMLSocket.onmessage = event => {
        element.innerHTML = event.data
    }
    element.onmousemove = ev => {
        const axes = element.firstChild


        const position = axes.dataset.position.split(' ').map(s => parseFloat(s))
        const xLim = axes.dataset.xLim.split(' ').map(s => parseFloat(s))
        const yLim = axes.dataset.yLim.split(' ').map(s => parseFloat(s))

        const xInNormalized = ev.offsetX / 400
        const xInData = polyval(
            polyfit([position[0], position[0] + position[2]], xLim, 1),
            [xInNormalized]
        )[0];

        const yInNormalized = 1 - ev.offsetY / 300
        const yInData = polyval(
            polyfit([position[1], position[1] + position[3]], yLim, 1),
            [yInNormalized]
        )[0];

        if (!isbetween(xInData, xLim) || !isbetween(yInData, yLim)) {
            cursorElement.innerText = `cursor: undefined`
            return
        } else {
            cursorElement.innerText = `cursor: {x: ${xInData}, y: ${yInData}}`
        }
    }
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));


