import { readFile } from 'fs'

const startTime = Date.now()
readFile('tmp.dat', err => {
    if (err) throw err

    console.log(`${Date.now() - startTime} ms`)
})