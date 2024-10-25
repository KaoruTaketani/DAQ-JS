import sub2ind from './sub2ind.js'
const data = {
    size: [64, 64],
    array: new Array(64 * 64)
}
for (let j = 1; j <= data.size[1]; ++j) {
    for (let i = 1; i <= data.size[0]; ++i) {
        data.array[sub2ind(data.size, i, j)] = Math.exp(-((i - 32) ** 2 + (j - 32) ** 2) / 32 ** 2)
    }
}
function readString(dataView, position, length) {
    return new Array(length)
        .fill(0)
        .map((e, index) => String.fromCharCode(dataView.getUint8(position + index))).join('');
}

function writeString(dataView, position, string) {
    string.split('').forEach((char, index) => dataView.setUint8(position + index, char.charCodeAt(0)));
}
const buffer = new Uint8Array(data.array.length)
const target = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
// magic
[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].forEach((value, index) => {
    target.setUint8(index, value)
})
// header
target.setuint32(8, 13)