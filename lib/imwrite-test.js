import { writeFile } from 'fs'
import imagesc from './imagesc.js'
import imwrite from './imwrite.js'
import gausswin from './gausswin.js'

const c = new Array(64 * 64),
    w = gausswin(64)

for (let j = 0; j < 64; ++j) {
    for (let i = 0; i < 64; ++i) {
        c[j * 64 + i] = w[i] * w[j]
    }
}
imwrite(imagesc({ binCounts: c, numBins: [64, 64], xBinLimits: [], yBinLimits: [] })).then(buffer => {
    writeFile('imwrite.png', buffer, err => {
        if (err) throw err
    })
})

