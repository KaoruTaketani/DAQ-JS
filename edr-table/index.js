import { createReadStream, readdir, readFile } from 'fs'
import { Server } from 'http'
import { basename, join } from 'path'
import Variables from './Variables.js'
import EventBufferParser from './EventBufferParser.js'

const httpServer = new Server()
const variables = new Variables()
const edrPath = '../../edr'

new EventBufferParser(variables)

httpServer.on('request', (request, response) => {
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)
    // console.log(url)
    if (url.pathname === '/readdir') {
        const path = url.searchParams.get('path')
        if (!path) return
        readdir(join(edrPath, path), { withFileTypes: true }, (err, files) => {
            if (err) {
                response.writeHead(404)
                response.end()
            } else {
                response.writeHead(200)
                if (path === '/') {
                    response.end(
                        files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                            .map(text => `<option>${text}</option>`).join('')
                    )
                } else {
                    response.end(
                        '<option>../</option>' + files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                            .map(text => `<option>${text}</option>`).join('')
                    )
                }
            }
        })
        return
    }
    if (url.pathname.endsWith('.edr')) {
        console.log(`pathname: ${url.pathname}, type: ${url.searchParams.get('type')}, offset: ${url.searchParams.get('offset')}`)
        const rs = createReadStream(join(edrPath, url.pathname), { highWaterMark: 25 * 8 })
        rs.on('data', chunk => {
            const channelEvents = new Array(25)
            for (let i = 0; i < chunk.length / 8; ++i) {
                if (chunk[8 * i] === 0x5a) {
                    const
                        data1 = chunk[8 * i + 1],
                        data2 = chunk[8 * i + 2],
                        data3 = chunk[8 * i + 3],
                        data4 = chunk[8 * i + 4],
                        data5 = chunk[8 * i + 5],
                        data6 = chunk[8 * i + 6],
                        data7 = chunk[8 * i + 7],
                        tof = ((data1 << 16) + (data2 << 8) + data3) * 25, /** time bin is 25 nsec */
                        channel = data4 & 0b111,
                        left = (data5 << 4) + (data6 >> 4),
                        right = ((data6 & 0b1111) << 8) + data7

                    channelEvents[i] = {
                        header:`0x5a`,
                        channel: channel,
                        tofInNanoseconds: tof,
                        left: left,
                        right: right
                    }
                } else if (chunk[8 * i] === 0x5b) {
                    channelEvents[i] = {
                        header:`0x5b`,
                        channel: Number.NaN,
                        tofInNanoseconds: Number.NaN,
                        left: Number.NaN,
                        right: Number.NaN
                    }
                } else if (chunk[8 * i] === 0x5c) {
                    channelEvents[i] = {
                        header:`0x5c`,
                        channel: Number.NaN,
                        tofInNanoseconds: Number.NaN,
                        left: Number.NaN,
                        right: Number.NaN
                    }
                } else {
                    // unexpected
                }
            }
            console.log(chunk.length)
            // console.log(channelEvents[0])
            response.end([
                '<thead>',
                '<tr>',
                Object.keys(channelEvents[0]).map(key => `<th>${key}</th>`).join(''),
                '</tr>',
                '</thead>',
                '<tbody align="right">',
                channelEvents.map(obj => ['<tr>',
                    Object.keys(obj).map(key => {
                        /** @type {any} */
                        const tmp = obj
                        return `<td>${tmp[key].toLocaleString()}</td>`
                    }).join(''),
                    '</tr>'].join('')
                ).join(''),
                '</tbody>'
            ].join(''))
            rs.close()
        })
        return
    }
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
            `    <p><a href="./PairedEventTableClient.html">Paired</a></p>`,
            `    <p><a href="./NeutronEventTableClient.html">Neutron</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
    }
}).listen(80)
