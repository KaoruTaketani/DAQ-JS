const socket = new WebSocket('ws://localhost/randomNumberInnerText')

socket.addEventListener('message', event => {
    console.log(event.data)
    socket.close()
})
