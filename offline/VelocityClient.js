const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const flightTimeElement = document.createElement('div')
document.body.appendChild(flightTimeElement)

const flightTimeLabelElement = document.createElement('label')
flightTimeLabelElement.innerText = 'time of flight (ms)'
flightTimeElement.appendChild(flightTimeLabelElement)

const flightTimeInputElement = document.createElement('input')
flightTimeInputElement.value = '40'
flightTimeLabelElement.appendChild(flightTimeInputElement)

const flightLengthElement = document.createElement('div')
document.body.appendChild(flightLengthElement)

const flightLengthLabelElement = document.createElement('label')
flightLengthLabelElement.innerText = 'flight length (m)'
flightLengthElement.appendChild(flightLengthLabelElement)

const flightLengthInputElement = document.createElement('input')
flightLengthInputElement.value = '20'
flightLengthLabelElement.appendChild(flightLengthInputElement)

const submitButtonElement = document.createElement('input')
submitButtonElement.type = 'submit'
submitButtonElement.value = 'calculate'
submitButtonElement.onclick = () => {
    socket.send(JSON.stringify({
        tof: flightTimeInputElement.value,
        length: flightLengthInputElement.value
    }))
}
document.body.appendChild(submitButtonElement)

const velocityElement = document.createElement('p')
velocityElement.innerText = 'velocity (m/s): '
socket.onmessage = (/** @type {MessageEvent} */event) => {
    velocityElement.innerText = event.data
}
document.body.appendChild(velocityElement)

