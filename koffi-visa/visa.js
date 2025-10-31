import koffi from 'koffi'

const VI_SUCCESS = 0
const VI_NULL = 0

const ViUInt32 = koffi.alias('ViUInt32', 'uint32')
const ViStatus = ViUInt32
const ViObject = ViUInt32
const ViSession = ViUInt32
const ViAccessMode = ViUInt32
const ViByte = koffi.alias('ViByte', 'uchar')
const ViPBuf = koffi.pointer(ViByte)

const lib = koffi.load('visa64.dll')

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viopendefaultrm.html
const viOpenDefaultRM = lib.func('viOpenDefaultRM', ViStatus, [
    koffi.out(koffi.pointer(ViSession))
])

/**
 * @returns {number}
 */
export function openDefaultRM() {
    const sessionCodeBuffer = Buffer.alloc(4)
    const status = viOpenDefaultRM(sessionCodeBuffer)
    if (status < VI_SUCCESS) {
        console.log('Could not open a session to the VISA Resource Manager!')
        process.exit(1)
    }
    return koffi.decode(sessionCodeBuffer, ViSession)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viopen.html
const viOpen = lib.func('viOpen', ViStatus, [
    ViSession,
    'string',
    ViAccessMode,
    ViUInt32,
    koffi.out(koffi.pointer(ViSession))
])

/**
 * @param {number} driverSession
 * @param {string} resourceString
 * @returns {number}
 */
export function open(driverSession, resourceString) {
    const sessionBuffer = Buffer.alloc(4)
    const status = viOpen(driverSession, resourceString, VI_NULL, VI_NULL, sessionBuffer)
    if (status < VI_SUCCESS) {
        console.log('Cannot open a session to the device.')
        throw new Error()
    }
    return koffi.decode(sessionBuffer, ViSession)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viwrite.html
const viWrite = lib.func('viWrite', ViStatus, [
    ViSession,
    'string',
    ViUInt32,
    koffi.out(koffi.pointer(ViUInt32))
])

/**
 * @param {number} deviceSession
 * @param {string} message
 * @returns {number}
 */
export function write(deviceSession, message) {
    const writeCountBuffer = Buffer.alloc(4)
    const status = viWrite(deviceSession, message, message.length, writeCountBuffer)
    if (status < VI_SUCCESS) {
        console.log('Error writing to the device')
        throw new Error()
    }

    return koffi.decode(writeCountBuffer, ViUInt32)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viread.html
const viRead = lib.func('viRead', ViStatus, [
    ViSession,
    koffi.out(ViPBuf),
    ViUInt32,
    koffi.out(koffi.pointer(ViUInt32))
])

/**
 * @param {number} deviceSession
 * @param {number} messageLength
 * @returns {string}
 */
export function read(deviceSession, messageLength = 256) {
    const messageBuffer = Buffer.alloc(messageLength)
    const realMessageLengthBuffer = Buffer.alloc(4)
    const status = viRead(deviceSession, messageBuffer, messageLength, realMessageLengthBuffer)
    const realMessageLength = koffi.decode(realMessageLengthBuffer, ViUInt32)
    const data = messageBuffer.subarray(0, realMessageLength).toString()
    if (status < VI_SUCCESS) {
        console.log('Error reading a response from the device')
    }
    else {
        console.log(`Data read: ${data}`)
    }

    return data
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viclose.html
const viClose = lib.func('viClose', ViStatus, [
    ViObject
])

/**
 * @param {number} sessionCode
 * @returns {number}
 */
export function close(sessionCode) {
    const status = viClose(sessionCode)
    return status
}

