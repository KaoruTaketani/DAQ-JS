import { ok } from 'assert'
import { join } from 'path'
import axes from '../lib/axes.js'
import colon from '../lib/colon.js'
import scatter from '../lib/scatter.js'
import linspace from '../lib/linspace.js'
import max from '../lib/max.js'
import xlabel from '../lib/xlabel.js'
import diff from '../lib/diff.js'
// @ts-ignore
const h5wasm = await import("h5wasm/node")
await h5wasm.ready

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
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
            if (this._url.pathname !== '/centersByEnergy') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) {
                response.writeHead(400)
                response.end()
                return
            }

            let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r");
            let centers = f.get('centers')
            if (!centers) {
                response.writeHead(404)
                response.end()
                return
            }
            const velocity = f.get('energyInMillielectronvolts')
            if (!velocity) {
                response.writeHead(404)
                response.end()
                return
            }

            // console.log(filteredTOFHistogram.shape)
            // console.log(filteredTOFHistogram.value)
            const startTime = Date.now()
            const y = (/** @type {import('h5wasm').Dataset} */centers).value
            const x = Array.from(velocity.value)
            const dx = diff(x)
            const yMax = max(y)
            const xMax = x[0] + dx[0]// x[0] is the maximu velocity
            const xTick = linspace(0, xMax, 8 + 1)
            const ax = {
                xLim: [0, xMax],
                yLim: [0, yMax],
                xTick: xTick,
                yTick: [0, yMax],
                xTickLabel: xTick.map(x => x.toFixed()),
                yTickLabel: ['0', `${yMax.toFixed()}`]
            }
            response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            // console.log(colon(1, yData.length))
            // console.log(yData)
            response.end([
                axes(ax),
                xlabel(ax, 'neutron energy (meV)'),
                scatter(ax, x, y)
            ].join(''))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        }
    }
}
