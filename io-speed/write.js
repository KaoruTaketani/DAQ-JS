import { Buffer } from 'buffer'
import { writeFile } from 'fs'

const buf = Buffer.alloc(256 * 1024 * 1024)
const startTime = Date.now()
writeFile('tmp.dat', buf, err => {
    if (err) throw err

    console.log(`${Date.now() - startTime} ms`)
})