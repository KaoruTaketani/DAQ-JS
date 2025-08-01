[home](../README.md)

"When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem... Node.js will resume the operations when the response comes back"

### before
index.js:
```js
response.writeHead(200, { 'Content-Type': 'text/html' })
response.end([
    '<html>',
    '<head>',
    '    <meta charset="utf-8">',
    '</head>',
    '<body>',
    `    <p id="randomNumber">random number is NaN</p>`,
    `    <script type="module">`,
    '        const randomNumberElement = document.getElementById("randomNumber")',
    '        ',
    '        const socket = new WebSocket("ws://localhost")',
    '        socket.onclose = () => {',
    '            document.body.innerHTML = "the connection was closed by the server."',
    '        }',
    '        socket.onmessage = event => {',
    '            randomNumberElement.innerText = event.data',
    '        }',
    `    </script>`,
    '</body>',
    '</html>'
].join('\n'))
```

### after
index.js:
```js
import { readFile } from 'fs'

if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./Client.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
    return
}
if (request.url === '/Client.js') {
    readFile('./Client.js', 'utf8', (err, data) => {
        if (err) throw err

        response.writeHead(200, { 'Content-Type': 'text/javascript' })
        response.end(data)
    })
    return
}
```

Client.js
```js
const randomNumberElement = document.createElement('p')
document.body.appendChild(randomNumberElement)

const socket = new WebSocket("ws://localhost")
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}
socket.onmessage = event => {
    randomNumberElement.innerText = event.data
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser