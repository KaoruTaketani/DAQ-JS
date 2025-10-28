import koffi from 'koffi'

const ViUInt32 = koffi.alias('ViUInt32', 'uint32')
const ViPUInt32 = koffi.pointer(ViUInt32)
const ViStatus = ViUInt32
const ViObject = ViUInt32
const ViSession = ViUInt32
const ViPSession = koffi.pointer(ViSession)
const ViAccessMode = ViUInt32
const ViByte = koffi.alias('ViByte', 'uchar')
const ViPByte = koffi.pointer(ViByte)
const ViPBuf = ViPByte

// https://www.ni.com/docs/ja-JP/bundle/ni-visa/page/user-manual-welcome.html
const lib = koffi.load('visa64.dll')

/**
 * @param {number} statusCode
 */
export function checkStatus(statusCode) {
    if (statusCode.toString(16).startsWith('bfff')) {
        throw new Error(`NI-VISA Error: (0x${statusCode.toString(16)})`)
    } else {
        return
    }
}

// https://www.ni.com/docs/en-US/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viopendefaultrm.html
const _viOpenDefaultRM = lib.func('viOpenDefaultRM', ViStatus, [
    koffi.out(ViPSession)
])

/**
 * @returns {number}
 */
export function viOpenDefaultRM() {
    const sessionCodeBuffer = Buffer.alloc(4)
    const status = _viOpenDefaultRM(sessionCodeBuffer)
    checkStatus(status)
    return koffi.decode(sessionCodeBuffer, ViSession)
}

// https://www.ni.com/docs/en-US/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viopen.html
const _viOpen = lib.func('viOpen', ViStatus, [
    ViSession,
    'string',
    ViAccessMode,
    ViUInt32,
    koffi.out(ViPSession)
])

/**
 * @param {number} driverSession
 * @param {string} resourceString
 * @param {number} accessMode
 * @param {number} openTimeout
 * @returns {number}
 */
export function viOpen(driverSession, resourceString, accessMode = 0, openTimeout = 0) {
    const sessionCodeBuffer = Buffer.alloc(4)
    const status = _viOpen(driverSession, resourceString, accessMode, openTimeout, sessionCodeBuffer)
    checkStatus(status)
    return koffi.decode(sessionCodeBuffer, ViSession)
}

// https://www.ni.com/docs/en-US/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viclose.html
const _viClose = lib.func('viClose', ViStatus, [
    ViObject
])

/**
 * @param {number} sessionCode
 */
export function viClose(sessionCode) {
    const status = _viClose(sessionCode)
    checkStatus(status)
}

// https://www.ni.com/docs/en-US/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viwrite.html
const _viWrite = lib.func('viWrite', ViStatus, [
    ViSession,
    'string',
    ViUInt32,
    koffi.out(ViPUInt32)
])

/**
 * @param {number} deviceSession
 * @param {string} message
 * @returns {number}
 */
export function viWrite(deviceSession, message) {
    const messageLengthBuffer = Buffer.alloc(4)
    const status = _viWrite(deviceSession, message, message.length, messageLengthBuffer)
    checkStatus(status)
    return koffi.decode(messageLengthBuffer, ViUInt32)
}

// https://www.ni.com/docs/en-US/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viread.html
const _viRead = lib.func('viRead', ViStatus, [
    ViSession,
    koffi.out(ViPBuf),
    ViUInt32,
    koffi.out(ViPUInt32)
])

/**
 * @param {number} deviceSession
 * @param {number} messageLength
 * @returns {string} Response message
 */
export function viRead(deviceSession, messageLength = 256) {
    const messageBuffer = Buffer.alloc(messageLength)
    const realMessageLengthBuffer = Buffer.alloc(4)
    const status = _viRead(deviceSession, messageBuffer, messageLength, realMessageLengthBuffer)
    checkStatus(status)
    const realMessageLength = koffi.decode(realMessageLengthBuffer, ViUInt32)
    return messageBuffer.subarray(0, realMessageLength).toString()
}