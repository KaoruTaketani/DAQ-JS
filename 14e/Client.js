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
        socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
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
        socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
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
                const axes = element.firstChild

                const xInPixels = ev.offsetX * 560 / 400
                const xInNormalized = (xInPixels - axes.dataset.xminInPixels)
                    / (axes.dataset.xmaxInPixels - axes.dataset.xminInPixels)
                const xInData = Number(axes.dataset.xminInData)
                    + xInNormalized * (axes.dataset.xmaxInData - axes.dataset.xminInData)

                const yInPixels = ev.offsetY * 420 / 300
                const yInNormalized = (axes.dataset.yminInPixels - yInPixels)
                    / (axes.dataset.yminInPixels - axes.dataset.ymaxInPixels)
                const yInData = Number(axes.dataset.yminInData)
                    + yInNormalized * (axes.dataset.ymaxInData - axes.dataset.yminInData)

                if (xInNormalized < 0 || xInNormalized > 1) {
                    cursorElement.innerText = `cursor: undefined`
                    return
                }
                if (yInNormalized < 0 || yInNormalized > 1) {
                    cursorElement.innerText = `cursor: undefined`
                    return
                }
                const points = element.lastChild.getAttribute('points')

                const i = points.split(' ')
                    .map(point => parseFloat(point))
                    .filter(x => x <= xInPixels)
                    .length
                const point = points.split(' ')[i]
                const xStairInPixels = parseFloat(point.split(',')[0])
                const xStairInNormalized = (xStairInPixels - axes.dataset.xminInPixels)
                    / (axes.dataset.xmaxInPixels - axes.dataset.xminInPixels)
                const xStairInData = Number(axes.dataset.xminInData)
                    + xStairInNormalized * (axes.dataset.xmaxInData - axes.dataset.xminInData)

                const yStairInPixels = parseFloat(point.split(',')[1])
                const yStairInNormalized = (axes.dataset.yminInPixels - yStairInPixels)
                    / (axes.dataset.yminInPixels - axes.dataset.ymaxInPixels)
                const yStairInData = Number(axes.dataset.yminInData)
                    + yStairInNormalized * (axes.dataset.ymaxInData - axes.dataset.yminInData)

                cursorElement.innerText = `upperEdge: ${xStairInData}, binCount: ${yStairInData}`
                lineElement.setAttribute('points', `${ev.offsetX},0 ${ev.offsetX},420`)
            }
        })(foreignElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
    })(overlayElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')));


    const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    lineElement.setAttribute('stroke', 'red')
    overlayElement.appendChild(lineElement)
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));


