import { writeFile } from 'fs'
import imagesc from './imagesc.js'
import imwrite from './imwrite.js'

const c = new Array(64 * 64)
for (let j = 0; j < 64; ++j) {
    for (let i = 0; i < 64; ++i) {
        c[j * 64 + i] = Math.exp(-((i - 32) ** 2 + (j - 32) ** 2) / 16 ** 2)
    }
}
const C = imagesc({ binCounts: c, numBins: [64, 64], xBinLimits: [], yBinLimits: [] })
imwrite(C, 64, 64).then(buffer => {
    writeFile('imwrite.png', buffer, err => {
        if (err) throw err
    })
})

