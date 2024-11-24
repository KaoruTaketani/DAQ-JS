import { Buffer } from 'buffer'
import { open, close, write } from 'fs'

const buf = Buffer.alloc(256 * 1024 * 1024)

open('./tmp.dat', 'w', (err, fd) => {
    if (err) throw err

    const startTime = Date.now()
    write(fd, buf, 0, buf.length, err => {
        if (err) throw err
        console.log(`${Date.now() - startTime} ms`)

        close(fd, err => {
            if (err) throw err

        })
    })
})