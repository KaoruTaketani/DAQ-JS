[home](../README.md)

RandomNumberGetter.js
```js
if (this._state === 'idle') {
    if (this._randomNumberGetterDestinationState === 'busy') {
        this._socket = new Socket()
        this._socket.setEncoding('utf8')
        this._socket.on('data', data => {
            const randomNumber = parseFloat(data)
            variables.randomNumber.assign(randomNumber)
            setTimeout(() => {
                this._socket.write('get')
            }, 1000)
        }).on('close', () => {
            console.log('close')
        }).connect(23, 'localhost', () => {
            this._socket.write('get')
        })
        this._state = this._randomNumberGetterDestinationState
    }
    return
}
if (this._state = 'busy') {
     if (this._randomNumberGetterDestinationState === 'idle') {
        this._socket?.end()
        this._state = this._randomNumberGetterDestinationState
    }
    return
}
```

server.js

```js
const server = new Server({})

server.maxConnections = 1
server.on('connection', socket => {
    socket.setEncoding('utf8')
    socket.on('data', (/** @type {string} */data) => {
        console.log(`data: ${data}`)
        if (data === 'get')
            socket.write(Math.random().toString())
    }).on('close', () => {
        console.log('close')
    })
}).listen(23)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to the top folder
1. type `node simulator-rand` in the terminal
1. open another terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser