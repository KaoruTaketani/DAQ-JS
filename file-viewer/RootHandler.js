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
                `    <p><a href="./Timer.html">Timer</a></p>`,
                `    <p><a href="./Kicker.html">Kicker</a></p>`,
                `    <p><a href="./Channel.html">Channel</a></p>`,
                `    <p><a href="./Paired.html">Paired</a></p>`,
                `    <p><a href="./Neutron.html">Neutron</a></p>`,
                `    <h2>HDF5</h2>`,
                `    <p><a href="./Attributes.html">Attributes</a></p>`,
                `    <p><a href="./Centers.html">Centers</a></p>`,
                `    <p><a href="./CentersByEnergy.html">Centers by Energy</a></p>`,
                `    <p><a href="./CentersByVelocity.html">Centers by Velocity</a></p>`,
                `    <p><a href="./CentersByWavelength.html">Centers by Wavelength</a></p>`,
                `    <p><a href="./Contrast.html">Contrast</a></p>`,
                `    <p><a href="./FilteredImage.html">Filtered Image</a></p>`,
                `    <p><a href="./Heights.html">Heights</a></p>`,
                `    <p><a href="./HorizontalProjection.html">Horizontal Projection</a></p>`,
                `    <p><a href="./HorizontalProjectionHistograms.html">Horizontal Projection Histograms</a></p>`,
                `    <p><a href="./HorizontalProjectionMeans.html">Horizontal Projection Means</a></p>`,
                `    <p><a href="./HorizontalProjectionStandardDeviations.html">Horizontal Projection Standard Deviations</a></p>`,
                `    <p><a href="./NeutronRate.html">Neutron Rate</a></p>`,
                `    <p><a href="./Phase.html">Phase</a></p>`,
                `    <p><a href="./PulseHeightHistogram.html">Pulse Height Histogram</a></p>`,
                `    <p><a href="./RawImage.html">Raw Image</a></p>`,
                `    <p><a href="./TOFDifferenceHistogram.html">TOF Difference Histogram</a></p>`,
                `    <p><a href="./TOFHistogram.html">TOF Histogram</a></p>`,
                `    <p><a href="./VerticalProjection.html">Vertical Projection</a></p>`,
                `    <p><a href="./Widths.html">Widths</a></p>`,
                '</body>',
                '</html>'
            ].join('\n'))
        }
    }
}
