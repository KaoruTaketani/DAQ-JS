import { writeFile } from 'fs'
/// 256MB file, float64 items
/// from 512B, float64 64 items
/// to 64MB, float64 
///
/// encoding must be null?
/// https://nodejs.org/docs/latest/api/fs.html#fswritefilefile-data-options-callback
///
const
    // totalLength = 64, // 512B
    // totalLength = 128, // 1KB
    // totalLength = 2 * 128, // 2KB
    totalLength = 1024 * 128, // 1M<B
    // totalLength = 64 * 1024,
    // totalLength = 128 * 1024,
    // chunkLength = 128,
    // chunkLength = 1024,
    data = new Float64Array(totalLength)
const startTime = Date.now()
writeFile('../../tmp/512', data, err => {
    if (err) throw err

    console.log(`${Date.now() - startTime} ms, ${data.length}`)
})