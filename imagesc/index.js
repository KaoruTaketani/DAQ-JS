import { readFile } from 'fs'
import { Server } from 'http'
import { WebSocketServer } from 'ws'
import imagesc from '../lib/imagesc.js'
import imwrite from '../lib/imwrite.js'
import gausswin from '../lib/gausswin.js'

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
            const alpha = parseFloat(event.data),
                width = 64,
                height = 64,
                w = gausswin(width, 10 * alpha),
                h = gausswin(height, 10 * alpha)

            const c = new Array(height * width)
            for (let j = 0; j < height; ++j) {
                for (let i = 0; i < width; ++i) {
                    c[j * width + i] = w[i] * h[j]
                }
            }
            imwrite(imagesc({ binCounts: c, numBins: [width, height], xBinLimits: [], yBinLimits: [] })).then(buffer => {
                ws.send(`data:image/png;base64,${buffer.toString('base64')}`)
            })
        }
    })
})
httpServer.listen(80)

