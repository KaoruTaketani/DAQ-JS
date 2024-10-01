import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._httpResponse
        variables.httpResponse.addListener(arg => { this._httpResponse = arg })
        variables.httpRequestUrl.addListener(arg => {
            this._operation()
        })
        this._operation = () => {
            this._httpResponse.writeHead(200, { 'Content-Type': 'text/html' })
            this._httpResponse.end([
                '<html>',
                '',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '',
                '<body>',
                '    <h2>Random Number Generator</h2>',
                `    <p id="randomNumber"></p>`,
                `    <script type="module">`,
                '        const randomNumberElement = document.getElementById("randomNumber")',
                '        ',
                '        const socket = new WebSocket("ws://localhost")',
                '        socket.onclose = () => {',
                '            document.body.innerHTML = "the connection was closed by the server."',
                '        }',
                '        socket.onmessage = event => {',
                '            const msg = JSON.parse(event.data)',
                '            console.log(msg)',
                '            ',
                '            const keys = Object.keys(msg)',
                '            if (keys.length !== 1) return',
                '            if (keys[0] === "randomNumberInnerText") {',
                '                randomNumberElement.innerText = msg[keys[0]]',
                '            }',
                '        }',
                '    </script>',
                '</body>',
                '',
                '</html>'
            ].join('\n'))
        }
    }
}

