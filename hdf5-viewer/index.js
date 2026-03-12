import { readdir, readFile } from 'fs'
import { Server } from 'http'
import { basename, join } from 'path'
import imwrite from '../lib/imwrite.js'
import imagesc from '../lib/imagesc.js'
import max from '../lib/max.js'
import linspace from '../lib/linspace.js'
import axes from '../lib/axes.js'
import stairs from '../lib/stairs.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
const h5wasm = await import("h5wasm/node");
await h5wasm.ready;

const httpServer = new Server()
const hdf5Path = '../../hdf5'
const isDigit = (/** @type {string} */c) => c >= '0' && c <= '9'
const numDigit = (/** @type {string} */c, /** @type {number} */ i) => {
    let j
    for (j = i; j < c.length; j++)
        if (!isDigit(c[j]))
            return j - i
    return j - i
}
httpServer.on('request', (request, response) => {
    if (request.method !== 'GET') return

    if (!request.url) throw new Error()
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)
    // console.log(url)
    if (url.pathname === '/readdir') {
        const path = url.searchParams.get('path')
        if (!path) return
        readdir(join(hdf5Path, path), { withFileTypes: true }, (err, files) => {
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
                    // natural sort except top folder

                    response.end(
                        '<option>../</option>' + files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                            .sort((a, b) => {
                                // 1. As long as both characters at a given position are not digits, the alphabetical order is followed.
                                // 2. When there are two numbers and the amount of digits is not equal, the number with the least digits is the smallest.
                                // 3. If the numbers have the same amount of digits, the alphabetical order is followed.            
                                let i
                                for (i = 0; i < a.length; i++) {
                                    // 'b' can be a prefix of 'a'
                                    if (!b[i]) return 1
                                    if (isDigit(a[i]) && isDigit(b[i])) {
                                        const nda = numDigit(a, i)
                                        const ndb = numDigit(b, i)
                                        if (nda === ndb) continue
                                        return nda > ndb ? 1 : -1
                                    } else {
                                        // Compare alphabetic chars.
                                        if (a[i] === b[i]) continue
                                        return a[i] > b[i] ? 1 : -1
                                    }
                                }
                                return b[i] ? -1 : 0
                            })
                            .map(text => `<option>${text}</option>`).join('')
                    )
                }
            }
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
            `    <p><a href="./AttributesClient.html">Attributes</a></p>`,
            `    <p><a href="./FilteredImageClient.html">Filtered Image</a></p>`,
            `    <p><a href="./FilteredTOFHistogramClient.html">Filtered TOF Histogram</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
    } else if (url.pathname.endsWith('.h5')) {
        console.log(url.searchParams.get('path'))
        console.log(url.searchParams.get('type'))
        if (url.searchParams.get('type') === 'attributes') {
            // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            let f = new h5wasm.File(join(hdf5Path, url.pathname), "r")
            //     variables.hdf5File.assign(f)
            const tmp = Object.keys(f.attrs).map(key => {
                return `${key}: ${f.attrs[key].value}`
            }).join('\n')
            response.writeHead(200)
            response.end(tmp)
            f.close()
            return
        }
        if (url.searchParams.get('path') === '/filteredImage') {
            if (url.searchParams.get('type') === 'png') {
                let f = new h5wasm.File(join(hdf5Path, url.pathname), "r");
                const filteredImage = f.get('filteredImage')
                if (!filteredImage) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                console.log(filteredImage.shape)
                console.log(filteredImage.value)
                const startTime = Date.now()
                imwrite(imagesc({ numBins: filteredImage.shape, binCounts: filteredImage.value })).then(buffer => {
                    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                    response.writeHead(200, { 'Content-Type': 'application/base64' })
                    response.end(`data:image/png;base64,${buffer.toString('base64')}`)
                })
                return
            }
            if (url.searchParams.get('type') === 'svg') {
                let f = new h5wasm.File(join(hdf5Path, url.pathname), "r");
                const filteredImage = f.get('filteredImage')
                if (!filteredImage) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                // console.log(filteredTOFHistogram.shape)
                // console.log(filteredTOFHistogram.value)
                const startTime = Date.now()
                const widthInMillimeters = filteredImage.shape[0] / 1024 * 50
                const heightInMillimeters = filteredImage.shape[1] / 1024 * 50
                const ax = {
                    xLim: [0, widthInMillimeters],
                    yLim: [0, heightInMillimeters],
                    xTick: [0, widthInMillimeters],
                    yTick: [0, heightInMillimeters],
                    xTickLabel: ['0', `${widthInMillimeters.toFixed(1)}`],
                    yTickLabel: ['0', `${heightInMillimeters.toFixed(1)}`]
                }
                response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
                response.end([
                    axes(ax),
                    xlabel(ax, 'width (mm)'),
                    ylabel(ax, 'height (mm)')
                ].join(''))
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                return
            }
        }
        if (url.searchParams.get('path') === '/filteredTOFHistogram') {
            if (url.searchParams.get('type') === 'svg') {
                let f = new h5wasm.File(join(hdf5Path, url.pathname), "r");
                const filteredTOFHistogram = f.get('filteredTOFHistogram')
                if (!filteredTOFHistogram) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                // console.log(filteredTOFHistogram.shape)
                // console.log(filteredTOFHistogram.value)
                const startTime = Date.now()
                const binCounts = filteredTOFHistogram.value
                const yMax = max(binCounts)
                const xTick = linspace(0, binCounts.length, 8 + 1)
                const ax = {
                    xLim: [0, binCounts.length],
                    yLim: [0, yMax],
                    xTick: xTick,
                    yTick: [0, yMax],
                    xTickLabel: xTick.map(x => x.toFixed()),
                    yTickLabel: ['0', `${yMax}`]
                }
                response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
                response.end([
                    axes(ax),
                    xlabel(ax, 'tof (ch)'),
                    stairs(ax, { binLimits: [0, binCounts.length], binCounts: binCounts })
                ].join(''))
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                return
            }
        }
    } else if (url.pathname.endsWith('.js')) {
        readFile(`.${request.url}`, 'utf8', (err, data) => {
            if (err) {
                response.writeHead(404)
                response.end()
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' })
                response.end(data)
            }
        })
    } else if (url.pathname.endsWith('.html')) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./${basename(url.pathname, '.html')}.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
    } else {
        response.writeHead(404)
        response.end()
    }
}).listen(80)


