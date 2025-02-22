import { deflate, crc32 } from 'zlib'
import max from './max.js'
import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(1000)
        /** @type {import('./index.js').Histogram2D} */
        this._image
        variables.image.addListener(arg => {
            this._image = arg
            this._throttle()
        })
        this._operation = () => {
            const maxCount = max(this._image.binCounts)
            console.log(`maxCount:${maxCount}, total: ${this._image.binCounts.reduce((a,b)=>a+b,0)}`)
            const C = Uint8Array.from(this._image.binCounts.map(c => (c / maxCount) * 255))
            deflate(C, (err, buffer) => {
                if (err) throw err

                // magic
                const magic = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
                // header
                const header = Buffer.alloc(25)
                header.writeUInt32BE(13, 0x00) // data length; bytes for width, height,bit depth, color type,compress method, filter method and interlace method, whicha is 13 bytes
                header.writeUInt32BE(0x49484452, 0x04) // chunk type; IHDR in ASCII
                header.writeUint32BE(this._image.size[1], 0x08) // width
                header.writeUint32BE(this._image.size[0], 0x0c) // height
                header.writeUint8(8, 0x10) // bit depth
                header.writeUint8(0, 0x11) // color type; 0 is grayscale
                header.writeUint8(0, 0x12) // compress method; 0 is deflate
                header.writeUint8(0, 0x13) // filter method; must be 0
                header.writeUint8(0, 0x14) // interlace method; 0 do not use interlace
                header.writeUint32BE(crc32(header.subarray(0x04, 0x15)), 0x15) // crc for chunk type and data
                // data
                const data = Buffer.alloc(4 + 4 + buffer.length + 4)
                data.writeUint32BE(buffer.length, 0x0) // length of data
                data.writeUint32BE(0x49444154, 0x4) // chunk type; IDAT in ASCII
                for (let i = 0; i < buffer.length; ++i)
                    data.writeUint8(buffer[i], 0x8 + i)
                data.writeUint32BE(crc32(data.subarray(0x4, 0x4 + buffer.length)), 0x8 + buffer.length) // crc for chunk type and data
                // end
                const end = Buffer.alloc(12)
                end.writeUint32BE(0x49454e44, 0x4) // chunk type: IEND in ASCII
                end.writeUint32BE(crc32(end.subarray(0x4, 0x8)), 0x8) // crc for chunk type

                variables.imageSrc.assign(`data:image/png;base64,${Buffer.concat([magic, header, data, end]).toString('base64')}`)
            })
        }
    }
}
