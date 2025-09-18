const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

/** @type {Map<string,function>} */
const velocityListeners = new Map()
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        velocityListeners.get(key)?.(value)
    }
});

(element => {
    (element => {
        element.innerText = 'time of flight (ms)';
        (element => {
            element.type = 'number'
            element.addEventListener('change', () => {
                const value = parseFloat(element.value)
                if (Number.isNaN(value)) return

                socket.send(JSON.stringify({ tofInMilliseconds: value }))
            })
            velocityListeners.set('tofInputValue', (/** @type {string} */arg) => { element.value = arg })
        })(element.appendChild(document.createElement('input')));
    })(element.appendChild(document.createElement('label')));
})(document.body.appendChild(document.createElement('div')));


(element => {
    (element => {
        element.innerText = 'flight length (m)';
        (element => {
            element.type = 'number'
            element.addEventListener('change', () => {
                const value = parseFloat(element.value)
                if (Number.isNaN(value)) return

                socket.send(JSON.stringify({ flightLengthInMeters: value }))
            })
            velocityListeners.set('flightLengthInputValue', (/** @type {string} */arg) => { element.value = arg })
        })(element.appendChild(document.createElement('input')));
    })(element.appendChild(document.createElement('label')));
})(document.body.appendChild(document.createElement('div')));


(element => {
    velocityListeners.set('velocityMessageInnerText', (/** @type {string} */arg) => { element.innerText = arg })
})(document.body.appendChild(document.createElement('p')));





