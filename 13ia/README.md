RemoteNumber.js:
```js
export default class extends ListenableNumber {
    constructor(request, parser, response) {
        super()
        response.addListener(arg => {
            if (!arg.has(request)) return

            super.assign(parser(arg.get(request)))
        })
    }
}
```
TCPQueue.js:
```js
import { Socket } from 'net'

export default class {
    constructor(port, host, response) {
        this._port = port
        this._host = host
        this._isBusy = false
        this._queue = []
        this._request
        this._socket = new Socket()
        this._socket.setEncoding('utf8')
        this._socket.on('data', data => {
            response.assign(new URLSearchParams([[this._request, data]]))
            this._isBusy = false
            this._next()
        })
    }
    push(request) {
        this._queue.push(request)
        this._next()
    }
    _next() {
        if (this._isBusy) return

        this._request = this._queue.shift()
        if (!this._request) {
            this._socket.end()
            return
        }

        if (!this._socket.pending) {
            this._socket.write(this._request)
        } else {
            this._socket.connect(this._port, this._host, () => {
                this._socket.write(this._request)
            })
        }
        this._isBusy = true
    }
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to the top folder
1. type `node simulator-motor` in the terminal
1. open another terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser