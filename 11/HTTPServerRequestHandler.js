import { readFile } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('request', (request, response) => {
                if (request.url === '/') {
                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end([
                        '<html>',
                        '<head>',
                        '    <meta charset="utf-8">',
                        '</head>',
                        '<body>',
                        `    <script type="module" src="./RandomNumberGeneratorClient.js">`,
                        `    </script>`,
                        '</body>',
                        '</html>'
                    ].join('\n'))
                    return
                }
                if (request.url.endsWith('.js')) {
                    readFile(`.${request.url}`, 'utf8', (err, data) => {
                        if (err) throw err

                        response.writeHead(200, { 'Content-Type': 'text/javascript' })
                        response.end(data)
                    })
                    return
                }
                response.writeHead(404)
                response.end(`${request.url} was not found on this server`)
            })
        }
    }
}

