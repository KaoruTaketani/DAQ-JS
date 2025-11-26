import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'

const httpServer = new Server()

httpServer.on('request', (request, response) => {
    if (request.method !== 'GET') return
    console.log(`GET url: ${request.url}`)
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <p><a href="./OfflineClient.html">Offline</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
    } else if (request.url?.endsWith('.js')) {
        readFile(`.${request.url}`, 'utf8', (err, data) => {
            if (err) {
                response.writeHead(404)
                response.end()
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' })
                response.end(data)
            }
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
        response.writeHead(404)
        response.end()
    }
}).listen(80)


