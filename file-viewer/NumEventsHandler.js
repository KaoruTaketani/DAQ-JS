import { existsSync, statSync } from 'fs'
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
            if (this._url.pathname !== '/numEvents') return

            const path = this._url.searchParams.get('path')
            if (!path) return
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) return

            const filePath = join(this._edrPath, path, fileName)
            if (!existsSync(filePath)) {
                this._response.writeHead(404)
                this._response.end()
                return
            }

            const stat = statSync(filePath)
            this._response.writeHead(200)
            this._response.end(`${(stat.size / 8).toLocaleString()} events`)
        }
    }
}
