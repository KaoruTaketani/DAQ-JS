import { readdirSync } from 'fs'
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
        this._isDigit = (/** @type {string} */c) => c >= '0' && c <= '9'
        this._numDigit = (/** @type {string} */c, /** @type {number} */ i) => {
            let j
            for (j = i; j < c.length; j++)
                if (!this._isDigit(c[j]))
                    return j - i
            return j - i
        }
        this._operation = () => {
            if (this._url.pathname !== '/files') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            const extname = this._url.searchParams.get('extname')
            if (!extname) {
                response.writeHead(400)
                response.end()
                return
            }
            if (extname !== 'edr' && extname !== 'h5') {
                response.writeHead(400)
                response.end()
                return
            }

            const files = readdirSync(join(extname === 'edr' ? this._edrPath : this._hdf5Path, path), { withFileTypes: true })
            response.writeHead(200)
            if (path === '/') {
                response.end(
                    files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                        .map(text => `<option>${text}</option>`).join('')
                )
            } else {
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
                                if (this._isDigit(a[i]) && this._isDigit(b[i])) {
                                    const nda = this._numDigit(a, i)
                                    const ndb = this._numDigit(b, i)
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
    }
}
