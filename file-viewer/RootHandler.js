import { ok } from 'assert'

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {Map<URL,import('http').ServerResponse>} */
        this._responses
        variables.responses.prependListener(arg => { this._responses = arg })
        /** @type {URL} */
        this._url
        variables.url.addListener(arg => {
            this._url = arg
            this._operation()
        })
        this._operation = () => {
            if (this._url.pathname !== '/') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)

            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <h2>EDR</h2>`,
                `    <p><a href="./TimerClient.html">Timer</a></p>`,
                `    <p><a href="./KickerClient.html">Kicker</a></p>`,
                `    <p><a href="./ChannelClient.html">Channel</a></p>`,
                `    <p><a href="./PairedClient.html">Paired</a></p>`,
                `    <p><a href="./NeutronClient.html">Neutron</a></p>`,
                `    <h2>HDF5</h2>`,
                `    <p><a href="./AttributesClient.html">Attributes</a></p>`,
                `    <p><a href="./CentersClient.html">Centers</a></p>`,
                `    <p><a href="./ContrastClient.html">Contrast</a></p>`,
                `    <p><a href="./RawImageClient.html">Raw Image</a></p>`,
                `    <p><a href="./FilteredImageClient.html">Filtered Image</a></p>`,
                `    <p><a href="./TOFHistogramClient.html">TOF Histogram</a></p>`,
                '</body>',
                '</html>'
            ].join('\n'))
        }
    }
}
