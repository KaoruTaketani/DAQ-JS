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
                `    <p><a href="./Table.html">Table</a></p>`,
                `    <h2>HDF5</h2>`,
                `    <p><a href="./Attributes.html">Attributes</a></p>`,
                `    <p><a href="./XY.html">XY</a></p>`,
                `    <p><a href="./Waveform.html">Waveform</a></p>`,
                `    <p><a href="./Image.html">Image</a></p>`,
                `    <h2>Calculator</h2>`,
                `    <p><a href="./Slit.html">Slit</a></p>`,
                '</body>',
                '</html>'
            ].join('\n'))
        }
    }
}
