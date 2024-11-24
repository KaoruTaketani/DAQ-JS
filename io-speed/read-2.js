import { createReadStream } from 'fs'

const startTime = Date.now()
createReadStream('tmp.dat').on('data', () => {

}).on('end', () => {
    console.log(`${Date.now() - startTime} ms`)
})