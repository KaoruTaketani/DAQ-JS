const socket = new WebSocket('ws://localhost/date')

socket.addEventListener('message', event => {
    console.log(event.data)
    socket.close()
})
