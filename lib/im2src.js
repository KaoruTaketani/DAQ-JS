/**
 * @param {import('./index.js').Image} im
 * @param {HTMLCanvasElement} canvas
 * @returns {string}
 */
export default (
    im,
    canvas
) => {
    const ctx = canvas.getContext('2d')
    if (ctx === null) throw new Error()

    canvas.width = im.width
    canvas.height = im.height
    const imagedata = ctx.createImageData(im.width, im.height)

    for (var y = 0; y < im.height; y++) {
        for (var x = 0; x < im.width; x++) {
            // x = 0 corresponds null data for png
            const rgb = im.data[y * (im.width + 1) + x + 1]
            imagedata.data[(y * im.width + x) * 4 + 0] = rgb  // R
            imagedata.data[(y * im.width + x) * 4 + 1] = rgb  // G
            imagedata.data[(y * im.width + x) * 4 + 2] = rgb  // B
            imagedata.data[(y * im.width + x) * 4 + 3] = 255  // Alpha
        }
    }

    ctx.putImageData(imagedata, 0, 0)

    return canvas.toDataURL()
}