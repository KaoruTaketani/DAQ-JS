import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import OfflineServer from './OfflineServer.js'

const httpServer = new Server(),
    variables = new Map(),
    servers = new Map()

httpServer.on('request', (request, response) => {
    if (request.method === 'GET') {
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
            if (request.url) {
                const url = new URL(`http://localhost${request.url}`)
                console.log(`hash ${url.hash}, pathname: ${url.pathname}, search: ${url.search}, searchParams: ${url.searchParams}`)
                const time = parseInt(url.pathname.substring(1)),
                    key = url.search.substring(1)
                console.log(`time: ${time},key: ${key}, ${variables.get(time)}`)

                response.writeHead(200, { 'Content-Type': 'text/plain' })
                response.end(variables.get(time).get(key))

            } else {
                response.writeHead(404)
                response.end()
            }
        }
    }
    if (request.method === 'PUT') {
        console.log(`PUT url: ${request.url}`)
        const url = new URL(`http://localhost${request.url}`)
        console.log(`hash ${url.hash}, pathname: ${url.pathname}, search: ${url.search}, searchParams: ${url.searchParams}`)
        const time = parseInt(url.pathname.substring(1)),
            value = url.searchParams.get('hdf5FileReaderFileName'),
            v=variables.get(time),
            s=servers.get(v)
        console.log(`has: ${url.searchParams.has('hdf5FileReaderFileName')}, get: ${value}, v: ${v}, s: ${s}`)
        if (url.searchParams.has('hdf5FileReaderFileName'))
            s.variables.hdf5FileReaderFileName.assign(value)
    }
    if (request.method === 'POST') {
        console.log(`POST url: ${request.url}`)
        const time = Date.now()
        variables.set(time, new Map())
        servers.set(variables.get(time), new OfflineServer(variables.get(time)))
        response.writeHead(200)
        response.end(time.toString())
    }
    if (request.method === 'DELETE') {
        console.log(`DELETE url: ${request.url}`)
    }

}).listen(80)


