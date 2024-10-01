import { PNG } from 'pngjs'
import rescale from './rescale.js'
/**
 * @param {import('./index.js').Histogram2D} histogram2d
 * @returns {string}
 */
export default (
    histogram2d
) => {
    const png = new PNG({
        width: histogram2d.numberOfBinsX,
        height: histogram2d.numberOfBinsY,
        bitDepth: 8,
        filterType: 0,
        colorType: 0
    })
    const data = rescale(histogram2d.value)
    for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
            var idx = png.width * y + x
            png.data[4 * idx] = data[idx] * 255 // red
            png.data[4 * idx + 1] = data[idx] * 255 // red
            png.data[4 * idx + 2] = data[idx] * 255 // red
            png.data[4 * idx + 3] = 255
        }
    }
    // const max = histogram2d.value.reduce((a, b) => Math.max(a, b), 0)
    // for (let y = 0; y < png.height; y++) {
    //     for (let x = 0; x < png.width; x++) {
    //         var idx = png.width * y + x
    //         png.data[4 * idx] = histogram2d.value[idx] * 255 / max; // red
    //         png.data[4 * idx + 1] = histogram2d.value[idx] * 255 / max; // red
    //         png.data[4 * idx + 2] = histogram2d.value[idx] * 255 / max; // red
    //         png.data[4 * idx + 3] = 255
    //     }
    // }
    // /** @type {Buffer[]} */
    // const chunks = []
    // png.on('data', chunk => {
    //     chunks.push(chunk)
    // }).on('end', () => {
    //     const result = Buffer.concat(chunks)
    //     resolve(`data:image/png;base64,${result.toString('base64')}`)
    // }).pack()

    // resolve(`data:image/png;base64,${PNG.sync.write(png).toString('base64')}`)
    return `data:image/png;base64,${PNG.sync.write(png).toString('base64')}`
}