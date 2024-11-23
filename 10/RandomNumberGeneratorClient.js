const randomNumberElement = document.createElement('p')
document.body.appendChild(randomNumberElement)

const socket = new WebSocket("ws://localhost")
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
