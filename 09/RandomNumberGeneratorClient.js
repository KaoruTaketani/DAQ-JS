const socket = new WebSocket("ws://localhost")
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const messageElement = document.createElement("p")
messageElement.innerText = "random number is NaN"
socket.onmessage = event => {
    const msg = JSON.parse(event.data)
    //console.log(msg)

    if (msg.channel === "messageInnerText") {
        messageElement.innerText = msg.value
    }
}
document.body.appendChild(messageElement)

const buttonElement = document.createElement("input")
buttonElement.type = "button"
buttonElement.value = "generate"
buttonElement.style.width = "100px"
buttonElement.addEventListener("click", () => {
    socket.send(JSON.stringify({ channel: "clickedElementValue", value: buttonElement.value }))
})
document.body.appendChild(buttonElement)
