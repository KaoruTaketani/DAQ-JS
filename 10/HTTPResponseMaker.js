import { readFile } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._httpResponse
        variables.httpResponse.addListener(arg => { this._httpResponse = arg })
        this._httpRequestUrl
        variables.httpRequestUrl.addListener(arg => {
            this._httpRequestUrl = arg
            this._operation()
        })
        this._operation = () => {
            // console.log(this._httpRequestUrl)
            if (this._httpRequestUrl === '/') {
                this._httpResponse.writeHead(200, { 'Content-Type': 'text/html' })
                this._httpResponse.end([
                    '<html>',
                    '',
                    '<head>',
                    '    <meta charset="utf-8">',
                    '</head>',
                    '',
                    '<body>',
                    '    <p><a href="RandomNumberGeneratorClient.html">Random Number Generator</a></p>',
                    '</body>',
                    '',
                    '</html>'
                ].join('\n'))
                return
            }
            if (this._httpRequestUrl === '/RandomNumberGeneratorClient.html') {
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
                    `    <script type="module" src="RandomNumberGeneratorClient.js">`,
                    '    </script>',
                    '</body>',
                    '',
                    '</html>'
                ].join('\n'))
                return
            }
            if (this._httpRequestUrl === '/RandomNumberGeneratorClient.js') {
                readFile('RandomNumberGeneratorClient.js', (err, data) => {
                    if (err) throw err

                    this._httpResponse.writeHead(200, { 'Content-Type': 'text/javascript' })
                    this._httpResponse.end(data)
                })
                return
            }
            this._httpResponse.writeHead(404)
            this._httpResponse.end(`${this._httpRequestUrl} was not found on this server`)
        }
    }
}

