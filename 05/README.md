[home](../README.md)

"The WebSocket API makes it possible to open a two-way interactive communication session between the user's browser and a server"

By runnging the sample code, a number is shown in the browser. The number changes without reloading.

### before
```js
setInterval(() => {
    randomNumber = Math.random()
}, 1000)
```

```html
<p >random number is ${randomNumber}</p>
```
### after
```js
import { WebSocketServer } from 'ws'

const webSocketServer = new WebSocketServer({ noServer: true })

setInterval(() => {
    randomNumber = Math.random()
    webSocketServer.clients.forEach(ws => {
        ws.send(`random number is ${randomNumber}`)
    })
}, 1000)
```

```html
<p id="randomNumber">random number is NaN</p>
<script type="module">
const randomNumberElement = document.getElementById("randomNumber")
                
const socket = new WebSocket("ws://localhost")
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
randomNumberElement.innerText = event.data
}
</script>
```
## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser