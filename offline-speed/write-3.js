import { Buffer } from 'buffer'
import { open, close, write } from 'fs'

const buf = Buffer.alloc(256 * 1024 * 1024),
    len = 64 * 1024,
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
        const elapsedTime = Date.now() - startTime
        console.log(`${elapsedTime} ms, ${Math.trunc(256 / (1e-3 * elapsedTime))} MBps`)
    
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
