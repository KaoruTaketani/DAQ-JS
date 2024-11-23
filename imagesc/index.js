import { Server } from 'http'
import { readFile } from 'fs'
import { WebSocketServer } from 'ws'
import { deflate, crc32 } from 'zlib'
import { Buffer } from 'buffer'

const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })

httpServer.on('request', (request, response) => {
    if (request.url.endsWith('.js')) {
        readFile('./ImageClient.js', 'utf8', (err, data) => {
            if (err) throw err

            response.writeHead(200, { 'Content-Type': 'text/javascript' })
            response.end(data)
        })
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./ImageClient.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
    }
})
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        ws.onmessage = event => {
            const center = parseFloat(event.data)
            // console.log(center)

            const c = new Array(64 * (64 + 1)).fill(0)
            for (let j = 0; j < 64; ++j) {
                for (let i = 1; i < 64 + 1; ++i) {
                    // c[j * (64 + 1)] is filter type, which is zero
                    const f = Math.exp(-((i - 64 * center) ** 2 + (j - 32) ** 2) / 16 ** 2)
                    c[j * (64 + 1) + i] = Math.floor(f * 255 / 1.0 + 0.5)
                }
            }
            const C = Uint8Array.from(c)
            deflate(C, (err, buffer) => {
                if (err) throw err

                // magic
                const magic = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
                // header
                const header = Buffer.alloc(25)
                header.writeUInt32BE(13, 0x00) // data length; bytes for width, height,bit depth, color type,compress method, filter method and interlace method, whicha is 13 bytes
                header.writeUInt32BE(0x49484452, 0x04) // chunk type; IHDR in ASCII
                header.writeUint32BE(64, 0x08) // width
                header.writeUint32BE(64, 0x0c) // height
                header.writeUint8(8, 0x10) // bit depth
                header.writeUint8(0, 0x11) // color type; 0 is grayscale
                header.writeUint8(0, 0x12) // compress method; 0 is deflate
                header.writeUint8(0, 0x13) // filter method; must be 0
                header.writeUint8(0, 0x14) // interlace method; 0 do not use interlace
                header.writeUint32BE(crc32(header.subarray(0x04, 0x15)), 0x15) // crc for chunk type and data
                // data
                const data = Buffer.alloc(4 + 4 + buffer.length + 4)
                data.writeUint32BE(buffer.length, 0x0) // length of data
                data.writeUint32BE(0x49444154, 0x4) // chunk type; IDAT in ASCII
                for (let i = 0; i < buffer.length; ++i)
                    data.writeUint8(buffer[i], 0x8 + i)
                data.writeUint32BE(crc32(data.subarray(0x4, 0x4 + buffer.length)), 0x8 + buffer.length) // crc for chunk type and data
                // end
                const end = Buffer.alloc(12)
                end.writeUint32BE(0x49454e44, 0x4) // chunk type: IEND in ASCII
                end.writeUint32BE(crc32(end.subarray(0x4, 0x8)), 0x8) // crc for chunk type
                
                ws.send(`data:image/png;base64,${Buffer.concat([magic, header, data, end]).toString('base64')}`)
            })

        }
    })
})
httpServer.listen(80)

