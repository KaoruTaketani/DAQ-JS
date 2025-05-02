const socket = new WebSocket('ws://localhost')

socket.addEventListener('open', () => {
    const data = { type: 'message', content: 'Hello from Node.js!' }
    socket.send(JSON.stringify(data))
})
