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
                `    <p>random number is ${Math.random()}</p>`,
                '</body>',
                '',
                '</html>'
            ].join('\n'))
        }
    }
}
