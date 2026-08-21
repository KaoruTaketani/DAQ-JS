import getCurrentPoint from './getCurrentPoint.js'
import getXLim from './getXLim.js'
import getYLim from './getYLim.js'
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



(overlayElement => {
    overlayElement.setAttribute('width', '400')
    overlayElement.setAttribute('height', '300');

    (foreignElement => {
        foreignElement.setAttribute('width', '400')
        foreignElement.setAttribute('height', '300');

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
                const [x, y] = getCurrentPoint(element.firstChild, ev)
                const xLim = getXLim(element.firstChild)
                const yLim = getYLim(element.firstChild)

                if (!isbetween(x, xLim) || !isbetween(y, yLim)) {
                    cursorElement.innerText = `cursor: undefined`
                } else {
                    cursorElement.innerText = `cursor: {x: ${x}, y: ${y}}`
                }

                lineElement.setAttribute('points', `${ev.offsetX},0 ${ev.offsetX},420`)
            }
        })(foreignElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
    })(overlayElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')));


    const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    lineElement.setAttribute('stroke', 'red')
    overlayElement.appendChild(lineElement)
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));


