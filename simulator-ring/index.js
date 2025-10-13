const buffer = Uint8Array(16),
    readIndex = 0,
    writeIndex = 0

function write(value) {
    buffer[writeIndex % buffer.size] = value
    writeIndex++
    if (writeIndex === buffer.size) {
        writeIndex = 0
    }
}
function read() {
    if (readIndex < writeIndex) {
        const modified = buffer.subarray(readIndex, writeIndex)
        readIndex = writeIndex
        return modified
    } else {
        const modified = new Uint8Array((buffer.size - readIndex) + writeIndex)
        for (let i = 0; i < modified.size; ++i) {
            if (i < buffer.size - readIndex) {
                modified[i] = buffer[readIndex + i]
            } else {
                modified[i] = buffer[i - (buffer.size - readIndex)]
            }
        }
        readIndex = writeIndex
        return modified
    }
}


