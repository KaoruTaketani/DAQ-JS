import Operator from './Operator.js'
import { readFile } from 'fs'
import { basename } from 'path'

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('http').Server} */
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('request', (request, response) => {
                if (request.url?.endsWith('.js')) {
                    readFile(`.${request.url}`, 'utf8', (err, data) => {
                        if (err) throw err

                        response.writeHead(200, { 'Content-Type': 'text/javascript' })
                        response.end(data)
                    })
                } else if (request.url?.endsWith('.html')) {
                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end([
                        '<html>',
                        '<head>',
                        '    <meta charset="utf-8">',
                        '</head>',
                        '<body>',
                        `    <script type="module" src="./${basename(request.url, '.html')}.js">`,
                        `    </script>`,
                        '</body>',
                        '</html>'
                    ].join('\n'))
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end([
                        '<html>',
                        '<head>',
                        '    <meta charset="utf-8">',
                        '</head>',
                        '<body>',
                        `    <p><a href="./ChannelEventTableClient.html">Channel</a></p>`,
                        `    <p><a href="./FlagEventTableClient.html">Flag</a></p>`,
                        `    <p><a href="./NeutronEventTableClient.html">Neutron</a></p>`,
                        `    <p><a href="./PairedEventTableClient.html">Paired</a></p>`,
                        `    <p><a href="./UnixTimeEventTableClient.html">Unix Time</a></p>`,
                        '</body>',
                        '</html>'
                    ].join('\n'))
                }
            })
        }
    }
}

