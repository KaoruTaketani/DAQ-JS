const socket = new WebSocket('ws://localhost/message')

socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
    socket.close()
})
