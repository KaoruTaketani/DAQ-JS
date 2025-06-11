[home](../README.md)

enable the server to send multiple variables

### before
RandomNumberInnerTextChanger.js:
```js
this._webSocketServer.clients.forEach(ws => {
     ws.send(`random number is ${this._randomNumber}`)
})
```

Client.js
```js
const socket = new WebSocket("ws://localhost")
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
```

### after
HTTPServerUpgradeHandler.js:
```js
this._webSocketServer.handleUpgrade(request, socket, head, ws => {
    const url = new URL(`ws://localhost${request.url}`)
    this._webSocketPathnames.set(ws, url.pathname)

    ws.on('close', () => {
        this._webSocketPathnames.delete(ws)
    })
})
```

RandomNumberInnerTextChanger.js:
```js
this._webSocketPathnames.forEach((pathname, ws) => {
    if (pathname === '/randomNumberInnerText')
        ws.send(`random number is ${this._randomNumber}`)
})
```

StartTimeInnerTextChanger.js:
```js
if (this._startTime) return

this._startTime = Date.now()
this._webSocketPathnames.forEach((pathname, ws) => {
    if (pathname === '/startTimeInnerText')
        ws.send(`start time is ${new Date(this._startTime).toString()}`)
})
```

Client.js:
```js
const url = new URL(import.meta.url)
url.protocol = 'ws'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const startTimeElement = document.createElement('p')
url.pathname = 'startTimeInnerText'
const startTimeInnerTextSocket = new WebSocket(url)
startTimeInnerTextSocket.onmessage = event => {
    startTimeElement.innerText = event.data
}
document.body.appendChild(startTimeElement)

const randomNumberElement = document.createElement('p')
url.pathname = 'randomNumberInnerText'
const randomNumberInnerTextSocket = new WebSocket(url)
randomNumberInnerTextSocket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
document.body.appendChild(randomNumberElement)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser