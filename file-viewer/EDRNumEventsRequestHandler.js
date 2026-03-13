import { statSync } from 'fs'
import { join } from 'path'

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
        /** @type {import('http').ServerResponse} */
        this._response
        variables.response.prependListener(arg => { this._response = arg })
        /** @type {URL} */
        this._url
        variables.url.addListener(arg => {
            this._url = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._url.pathname.endsWith('.edr')) return
            if (this._url.searchParams.get('type') !== 'numEvents') return

            const stat = statSync(join(this._edrPath, this._url.pathname))
            this._response.end(`${(stat.size / 8).toLocaleString()} events`)
        }
    }
}
