import { Buffer } from 'buffer'
import { open, close, write } from 'fs'

const buf = Buffer.alloc(256 * 1024 * 1024),
    len = 1024,
    offsets = new Array(buf.length / len).fill(0).map((_, i) => i * len)
    
open('./tmp.dat', 'w', (err, fd) => {
    if (err) throw err

    const startTime = Date.now()
    Promise.all(offsets.map(offset => new Promise((resolve, reject) => {
        write(fd, buf, offset, len, err => {
            if (err) reject(err)
            resolve()
        })
    }))).then(() => {
        console.log(`${Date.now() - startTime} ms`)

        close(fd, err => {
            if (err) throw err

        })
    }).catch(err => {
        console.log(err)
        close(fd, err => {
            if (err) throw err
        })
    })
})
