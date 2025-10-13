const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    element.type = 'button'
    element.value = 'stop'
    element.style.width = '130px'
    element.onclick = () => {
        socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));

const tableElement = document.createElement('table')
document.body.appendChild(tableElement);

(element => {
    element.innerHTML = '<tr><th>name</th><th>pulse</th><th>destination</th><th>limit switch</th></tr>'
})(tableElement.appendChild(document.createElement('thead')));

const bodyElement = document.createElement('tbody')
tableElement.appendChild(bodyElement);

(element => {
    (element => {
        element.innerText = 'x'
    })(element.appendChild(document.createElement('td')));

    (element => {
        element.style.textAlign = 'right'
        url.pathname = 'xPulseInnerText'
        const innerTextSocket = new WebSocket(url)
        innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.innerText = event.data
        }
    })(element.appendChild(document.createElement('td')));

    (element => {
        const destinationElement = document.createElement('input')
        destinationElement.style.width = '130px'
        url.pathname = 'xDestinationDisabled'
        const destinationDisabledSocket = new WebSocket(url)
        destinationDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
            destinationElement.disabled = event.data === 'true'
        }
        url.pathname = 'xDestinationValue'
        const valueSocket = new WebSocket(url)
        valueSocket.onmessage = (/** @type {MessageEvent}*/event) => {
            destinationElement.value = event.data
        }
        element.appendChild(destinationElement)

        const buttonElement = document.createElement('input')
        buttonElement.type = 'button'
        buttonElement.value = 'move'
        buttonElement.onclick = () => {
            const destination = parseInt(destinationElement.value)
            if (Number.isNaN(destination)) {
                destinationElement.value = `NaN`
            } else {
                socket.send(JSON.stringify({ xDestination: destination }))
            }
        }
        url.pathname = 'moveXButtonDisabled'
        const buttonDisabledSocket = new WebSocket(url)
        buttonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
            buttonElement.disabled = event.data === 'true'
        }
        element.appendChild(buttonElement)
    })(element.appendChild(document.createElement('td')));

    (element => {
        element.style.textAlign = 'right'
        element.innerText = 'off'
    })(element.appendChild(document.createElement('td')));
})(bodyElement.appendChild(document.createElement('tr')));


(element => {
    (element => {
        element.innerText = 'theta'
    })(element.appendChild(document.createElement('td')));

    (element => {
        element.style.textAlign = 'right'
        url.pathname = 'thetaPulseInnerText'
        const innerTextSocket = new WebSocket(url)
        innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.innerText = event.data
        }
    })(element.appendChild(document.createElement('td')));

    (element => {
        const destinationElement = document.createElement('input')
        destinationElement.style.width = '130px'
        url.pathname = 'thetaDestinationDisabled'
        const destinationDisabledSocket = new WebSocket(url)
        destinationDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
            destinationElement.disabled = event.data === 'true'
        }
        url.pathname = 'thetaDestinationValue'
        const destinationValueSocket = new WebSocket(url)
        destinationValueSocket.onmessage = (/** @type {MessageEvent}*/event) => {
            destinationElement.value = event.data
        }
        element.appendChild(destinationElement)

        const buttonElement = document.createElement('input')
        buttonElement.type = 'button'
        buttonElement.value = 'move'
        buttonElement.onclick = () => {
            const destination = parseInt(destinationElement.value)
            if (Number.isNaN(destination)) {
                destinationElement.value = `NaN`
            } else {
                socket.send(JSON.stringify({ thetaDestination: destination }))
            }
        }
        url.pathname = 'moveThetaButtonDisabled'
        const buttonDisabledSocket = new WebSocket(url)
        buttonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
            buttonElement.disabled = event.data === 'true'
        }
        element.appendChild(buttonElement)
    })(element.appendChild(document.createElement('td')));

    (element => {
        element.style.textAlign = 'right'
        element.innerText = 'off'
    })(element.appendChild(document.createElement('td')));
})(bodyElement.appendChild(document.createElement('tr')));







