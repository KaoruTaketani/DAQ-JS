import { readdir, readFile } from 'fs'
import { Server } from 'http'
import { basename, join } from 'path'

const httpServer = new Server()

httpServer.on('request', (request, response) => {
    if (request.method !== 'GET') return

    if (!request.url) throw new Error()
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)
    // console.log(url)
    if (url.pathname === '/readdir') {
        const path = url.searchParams.get('path')
        if (!path) return
        readdir(join('../../hdf5', path), { withFileTypes: true }, (err, files) => {
            if (err) throw err

            response.writeHead(200)
            response.end(
                files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                    .map(text => `<option>${text}</option>`).join('')
            )
        })
        return
    }
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
    } else if (request.url?.endsWith('.h5')) {
        readFile(`../../hdf5/debug${request.url}`, (err, data) => {
            if (err) {
                response.writeHead(404)
                response.end()
            } else {
                response.writeHead(200, { 'Content-Type': 'application/octet-stream' })
                response.end(data)
            }
        })
    } else if (request.url?.endsWith('.js')) {
        if (request.url.startsWith('/lib/')) {
            readFile(`..${request.url}`, 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404)
                    response.end()
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/javascript' })
                    response.end(data)
                }
            })
        } else {
            readFile(`.${request.url}`, 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404)
                    response.end()
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/javascript' })
                    response.end(data)
                }
            })
        }
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


