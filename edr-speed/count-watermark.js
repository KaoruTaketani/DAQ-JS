import { createReadStream } from 'fs'
import filePath from './filePath.js'
import { performance } from 'perf_hooks'

let a = 0,
    b = 0,
    c = 0,
    d = 0
performance.mark('start')
createReadStream(filePath()).on('data', chunk => {
    for (let i = 0; i < chunk.length / 8; ++i) {
        switch (chunk[8 * i]) {
            case 0x5a:
                a++
                break
            case 0x5b:
                b++
                break
            case 0x5c:
                c++
                break
            default:
                d++
        }
    }
}).on('end', () => {
    performance.mark('64K')
    console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', 'start', '64K').duration} ms`)
    a = 0
    b = 0
    c = 0
    d = 0
    createReadStream(filePath(), { highWaterMark: 1024 * 1024 }).on('data', chunk => {
        for (let i = 0; i < chunk.length / 8; ++i) {
            switch (chunk[8 * i]) {
                case 0x5a:
                    a++
                    break
                case 0x5b:
                    b++
                    break
                case 0x5c:
                    c++
                    break
                default:
                    d++
            }
        }
    }).on('close', () => {
        performance.mark('1M')
        console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', '64K', '1M').duration} ms`)

        a = 0
        b = 0
        c = 0
        d = 0
        createReadStream(filePath(), { highWaterMark: 16 * 1024 * 1024 }).on('data', chunk => {
            for (let i = 0; i < chunk.length / 8; ++i) {
                switch (chunk[8 * i]) {
                    case 0x5a:
                        a++
                        break
                    case 0x5b:
                        b++
                        break
                    case 0x5c:
                        c++
                        break
                    default:
                        d++
                }
            }
        }).on('close', () => {
            performance.mark('16M')
            console.log(`a: ${a.toLocaleString()}, b: ${b.toLocaleString()}, c: ${c.toLocaleString()}, d: ${d.toLocaleString()}, ${performance.measure('', '1M', '16M').duration} ms`)
        })
    })
})
