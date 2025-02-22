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
    buffer.writeUint8((time / 25) >> 16, 1)
    buffer.writeUint8((time / 25 & 0x00ff00) >> 8, 2)
    buffer.writeUint8((time / 25 & 0x0000ff), 3)
    const channel0 = 0
    buffer.writeUint8(channel0, 4)
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
    // and shift the result to fill uint8, 2^8=256
    const i5 = (left0 & 0xff0) >> 4
    const i6 = ((left0 & 0x00f) << 4) + ((right0 & 0xf00) >> 8)
    const i7 = right0 & 0x0ff
    buffer.writeUint8(i5, 5)
    buffer.writeUint8(i6, 6)
    buffer.writeUint8(i7, 7)
    // console.log(`${left0} ${(i5 << 4) + (i6 >> 4)} ${right0} ${((i6 & 0xf) << 8) + i7}`)
    // left = (i5 << 4) + (i6 >> 4),
    // right = ((i6 & 0xf) << 8) + i7


    buffer.writeUint8((time / 25) >> 16, 9)
    buffer.writeUint8((time / 25 & 0x00ff00) >> 8, 10)
    buffer.writeUint8((time / 25 & 0x0000ff), 11)
    const channel1 = 1
    buffer.writeUint8(channel1, 12)
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
    const i13 = (left1 & 0xff0) >> 4
    const i14 = ((left1 & 0x00f) << 4) + ((right1 & 0xf00) >> 8)
    const i15 = right1 & 0x0ff
    buffer.writeUint8(i13, 13)
    buffer.writeUint8(i14, 14)
    buffer.writeUint8(i15, 15)
    // console.log(`${left1} ${(i13 << 4) + (i14 >> 4)} ${right1} ${((i14 & 0xf) << 8) + i15}`)
    // console.log(`x: ${x},${Math.floor(1024 * left0 / (left0 + right0))} y: ${y},${Math.floor(1024 * left1 / (left1 + right1))} `)
    // x: Math.floor(1024 * xLeft / (xLeft + xRight)),
    // y: Math.floor(1024 * yLeft / (yLeft + yRight)),
    return buffer
}
