/**
 * @param {import('./index.js').Image|HTMLImageElement} im
 * @param {number[]} rect
 * @returns {Promise<ImageBitmap>}
 */
export default (
    im,
    rect
) => {
    if (im instanceof HTMLImageElement) {
        return createImageBitmap(im, rect[0], rect[1], rect[2], rect[3])
    } else {
        const imageData = new ImageData(im.width, im.height)

        for (var y = 0; y < im.height; y++) {
            for (var x = 0; x < im.width; x++) {
                // x = 0 corresponds null data for png
                const rgb = im.data[y * (im.width + 1) + x + 1]
                imageData.data[(y * im.width + x) * 4 + 0] = rgb  // R
                imageData.data[(y * im.width + x) * 4 + 1] = rgb  // G
                imageData.data[(y * im.width + x) * 4 + 2] = rgb  // B
                imageData.data[(y * im.width + x) * 4 + 3] = 255  // Alpha
            }
        }
        return createImageBitmap(imageData, rect[0], rect[1], rect[2], rect[3])
    }
}