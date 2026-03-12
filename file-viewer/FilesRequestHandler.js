import { readdirSync } from 'fs'
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

            const path = this._url.searchParams.get('path')
            if (!path) return
            const extname = this._url.searchParams.get('extname')
            if (!extname) return
            if (extname !== 'edr') return

            const files = readdirSync(join(this._edrPath, path), { withFileTypes: true })
            this._response.writeHead(200)
            if (path === '/') {
                this._response.end(
                    files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                        .map(text => `<option>${text}</option>`).join('')
                )
            } else {
                this._response.end(
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
