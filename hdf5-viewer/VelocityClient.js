const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
/** @type {Map<string,function>} */
const listeners = new Map()
socket.addEventListener('message', event => {
    const arg = JSON.parse(event.data)
    for (const [key, value] of Object.entries(arg)) {
        listeners.get(key)?.(value)
    }
})


const tofElement = document.createElement('div')
document.body.appendChild(tofElement)

const tofLabelElement = document.createElement('label')
tofLabelElement.innerText = 'time of flight (ms)'
tofElement.appendChild(tofLabelElement)

const tofInputElement = document.createElement('input')
// tofInputElement.value = '40'
tofInputElement.type = 'number'
tofInputElement.addEventListener('change', () => {
    const value = parseFloat(tofInputElement.value)
    if (Number.isNaN(value)) return

    socket.send(JSON.stringify({ tofInMilliseconds: value }))
})
listeners.set('tofInputValue', (/** @type {string} */arg) => { tofInputElement.value = arg })
// tofInputElement.dispatchEvent(new Event('change'))
tofLabelElement.appendChild(tofInputElement)

const flightLengthElement = document.createElement('div')
document.body.appendChild(flightLengthElement)

const flightLengthLabelElement = document.createElement('label')
flightLengthLabelElement.innerText = 'flight length (m)'
flightLengthElement.appendChild(flightLengthLabelElement)

const flightLengthInputElement = document.createElement('input')
// flightLengthInputElement.value = '20'
flightLengthInputElement.type = 'number'
flightLengthInputElement.addEventListener('change', () => {
    const value = parseFloat(flightLengthInputElement.value)
    if (Number.isNaN(value)) return

    socket.send(JSON.stringify({ flightLengthInMeters: value }))
})
listeners.set('flightLengthInputValue', (/** @type {string} */arg) => { flightLengthInputElement.value = arg })
// flightLengthInputElement.dispatchEvent(new Event('change'))
flightLengthLabelElement.appendChild(flightLengthInputElement)

const velocityElement = document.createElement('p')
velocityElement.innerText = 'velocity (m/s): '
listeners.set('velocityMessageInnerText', (/** @type {string} */arg) => { velocityElement.innerText = arg })
document.body.appendChild(velocityElement)

