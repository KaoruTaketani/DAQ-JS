/**
 * @param {number} time 
 * @param {number} x 
 * @param {number} y 
 * @returns {Buffer}
 */
export default (time, x, y) => {
    // x,y are expected to be in [0,1]
    // ,which is difference from the x,y defined
    // in NeutronEventMaker.js
    // x: Math.floor(1024 * xLeft / (xLeft + xRight)),
    // y: Math.floor(1024 * yLeft / (yLeft + yRight)),
    //
    // here, we fix left+right to 800
    // so, x = left/800 -> left = 800 * x, right = 800 - left = 800 * (1-x)
    //
    // see also EventsBufferParser.js
    //
    const buffer = Buffer.from([
        0x5a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x5a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ])
    if (time / 25 > 2 ** 24) {
        time = 2 ** 24 / 25 - 1
    }
    buffer[1] = (time / 25) >> 16
    buffer[2] = (time / 25 & 0x00ff00) >> 8
    buffer[3] = (time / 25 & 0x0000ff)
    const channel0 = 0
    buffer[4] = channel0
    const total = 1800
    let left0 = total * x
    let right0 = total * (1 - x)
    if (x < 0) {
        left0 = 0
        right0 = total
    }
    if (x > 1) {
        left0 = total
        right0 = 0
    }
    // mask w/ 0xf extracts the corresponding 4bit, 2^4=16, 
    buffer[5] = (left0 & 0xff0) >> 4
    buffer[6] = ((left0 & 0x00f) << 4) + ((right0 & 0xf00) >> 8)
    buffer[7] = right0 & 0x0ff


    buffer[9] = (time / 25) >> 16
    buffer[10] = (time / 25 & 0x00ff00) >> 8
    buffer[11] = (time / 25 & 0x0000ff)
    const channel1 = 1
    buffer[12] = channel1
    let left1 = total * y
    let right1 = total * (1 - y)
    if (y < 0) {
        left1 = 0
        right1 = total
    }
    if (y > 1) {
        left1 = total
        right1 = 0
    }
    buffer[13] = (left1 & 0xff0) >> 4
    buffer[14] = ((left1 & 0x00f) << 4) + ((right1 & 0xf00) >> 8)
    buffer[15] = right1 & 0x0ff

    return buffer
}
