import { readdir, readFile } from 'fs'
import { Server } from 'http'
import { basename, join } from 'path'
const h5wasm = await import("h5wasm/node");
await h5wasm.ready;

const httpServer = new Server()
const hdf5Path = '../../hdf5'

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
                    response.end(
                        '<option>../</option>' + files.map(file => file.isDirectory() ? file.name + '/' : file.name)
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
            '</body>',
            '</html>'
        ].join('\n'))
    } else if (url.pathname.endsWith('.h5')) {
        console.log(url.searchParams.get('path'))
        console.log(url.searchParams.get('type'))
        if (url.searchParams.get('type') === 'attributes') {
            // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            let f = new h5wasm.File(join(hdf5Path, url.pathname), "r");
            //     variables.hdf5File.assign(f)
            const tmp = Object.keys(f.attrs).map(key => {
                return `${key}: ${f.attrs[key].value}`
            }).join('\n')
            response.writeHead(200)
            response.end(tmp)
            f.close()
            return
        }

        readFile(`${hdf5Path}${request.url}`, (err, data) => {
            if (err) {
                response.writeHead(404)
                response.end()
            } else {
                response.writeHead(200, { 'Content-Type': 'application/octet-stream' })
                response.end(data)
            }
        })
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


