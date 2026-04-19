import { existsSync, statSync } from 'fs'
import { join } from 'path'
import { ok } from 'assert'

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
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
            if (this._url.pathname !== '/numEvents') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            /** @type {string[]} */
            const fileNames = this._url.searchParams.getAll('fileName')
            if (fileNames.length!==1) {
                response.writeHead(400)
                response.end()
                return
            }

            const filePath = join(this._edrPath, path, fileNames[0])
            if (!existsSync(filePath)) {
                response.writeHead(404)
                response.end()
                return
            }

            const stat = statSync(filePath)
            response.writeHead(200)
            response.end(`${(stat.size / 8).toLocaleString()} events`)
        }
    }
}
