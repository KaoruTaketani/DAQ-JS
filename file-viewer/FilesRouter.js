import express from 'express';
import { join } from 'path'
import { readdirSync } from 'fs'

const router = express.Router();
const isDigit = (/** @type {string} */c) => c >= '0' && c <= '9'
const numDigit = (/** @type {string} */c, /** @type {number} */ i) => {
    let j
    for (j = i; j < c.length; j++)
        if (!isDigit(c[j]))
            return j - i
    return j - i
}


router.get('/files', (req, res) => {
    if (!process.env.edrPath
        || !process.env.hdf5Path
        || !process.env.jsonPath
        || typeof req.query.path !== 'string'
        || typeof req.query.extname !== 'string') {
        res.status(404).send()
        return
    }
    let basePath = ''
    if (req.query.extname === 'edr') basePath = process.env.edrPath
    if (req.query.extname === 'h5') basePath = process.env.hdf5Path
    if (req.query.extname === 'json') basePath = process.env.jsonPath

    const files = readdirSync(join(basePath, req.query.path), { withFileTypes: true })

    if (req.query.path === '/') {
        res.send(
            files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                .map(text => `<option>${text}</option>`).join('')
        )
    } else {
        res.send(
            '<option>../</option>' + files.map(file => file.isDirectory() ? file.name + '/' : file.name)
                .sort((a, b) => {
                    // 1. As long as both characters at a given position are not digits, the alphabetical order is followed.
                    // 2. When there are two numbers and the amount of digits is not equal, the number with the least digits is the smallest.
                    // 3. If the numbers have the same amount of digits, the alphabetical order is followed.            
                    let i
                    for (i = 0; i < a.length; i++) {
                        // 'b' can be a prefix of 'a'
                        if (!b[i]) return 1
                        if (isDigit(a[i]) && isDigit(b[i])) {
                            const nda = numDigit(a, i)
                            const ndb = numDigit(b, i)
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
})

export default router;