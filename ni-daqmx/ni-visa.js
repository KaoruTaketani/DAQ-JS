import os from 'node:os'
import koffi from 'koffi'
import * as utils from './util.js'

/** Get NI-VISA library file name by platform */
/** @returns {string} */
function getLibNameByPlatform() {
    const platform = os.platform()
    // Windows x64 or x86
    if (platform === 'win32') return os.arch() === 'x64' ? 'visa64.dll' : 'visa32.dll'
    // Mac OS
    if (platform === 'darwin') return 'visa.framework/visa'
    // Linux
    if (platform === 'linux') return 'librsvisa'
    // Platform not supported
    throw new Error(`Platform '${platform}' not supported`)
}

// Load NI-VISA lib
const lib = koffi.load(getLibNameByPlatform())

// ========== NI-VISA data type alias ==========

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

// ========== Initializes VISA driver ==========

/** Initializes VISA driver lib function */
const _viOpenDefaultRM = lib.func('viOpenDefaultRM', ViStatus, [
    // Output param VISA session pointer
    koffi.out(ViPSession)
])

/**
 * Initializes VISA driver
 * @description Begin by initializing the VISA system. For this task you use viOpenDefaultRM(), which opens a communication channel with VISA itself.
 * @returns {number} VISA driver session code
 */
export function viOpenDefaultRM() {
    const sessionCodeBuffer = Buffer.alloc(4)
    const status = _viOpenDefaultRM(sessionCodeBuffer)
    utils.checkStatus(status)
    return koffi.decode(sessionCodeBuffer, ViSession)
}

// ========== Open device communication channel ==========

/** Open device communication channel lib function */
const _viOpen = lib.func('viOpen', ViStatus, [
    // VISA driver session code
    ViSession,
    // VISA resource string
    'string',
    // VISA device access mode
    ViAccessMode,
    // Open device communication timeout
    ViUInt32,
    // Output param VISA session pointer
    koffi.out(ViPSession)
])

/**
 * Open device communication channel
 * @param {number} driverSession - VISA driver session code
 * @param {string} resourceString - VISA resource string, example `TCPIP0::192.168.0.10::inst0::INSTR`
 * @param {number} accessMode - VISA device access mode, default is `0`
 * @param {number} openTimeout - Open device communication timeout, default is `0`
 * @returns {number} VISA device session code
 */
export function viOpen(driverSession, resourceString, accessMode = 0, openTimeout = 0) {
    const sessionCodeBuffer = Buffer.alloc(4)
    const status = _viOpen(driverSession, resourceString, accessMode, openTimeout, sessionCodeBuffer)
    utils.checkStatus(status)
    return koffi.decode(sessionCodeBuffer, ViSession)
}

// ========== Close VISA object ==========

/** Close VISA object lib function */
const _viClose = lib.func('viClose', ViStatus, [
    // VISA object session code
    ViObject
])

/**
 * Close VISA object
 * @param {number} sessionCode - VISA object session code
 */
export function viClose(sessionCode) {
    const status = _viClose(sessionCode)
    utils.checkStatus(status)
}

// ========== Write message to device ==========

/** Write message to device lib function */
const _viWrite = lib.func('viWrite', ViStatus, [
    // VISA device session code
    ViSession,
    // Message
    'string',
    // Message length
    ViUInt32,
    // Output param message length pointer
    koffi.out(ViPUInt32)
])

/**
 * Write message to device
 * @param {number} deviceSession - VISA device session code
 * @param {string} message - Message, example `*IDN?`
 * @returns {number} Length of message written
 */
export function viWrite(deviceSession, message) {
    const messageLengthBuffer = Buffer.alloc(4)
    const status = _viWrite(deviceSession, message, message.length, messageLengthBuffer)
    utils.checkStatus(status)
    return koffi.decode(messageLengthBuffer, ViUInt32)
}

// ========== Read message from device ==========

/** Read message from device lib function */
const _viRead = lib.func('viRead', ViStatus, [
    // VISA device session code
    ViSession,
    // Output param response message pointer
    koffi.out(ViPBuf),
    // Given response message length
    ViUInt32,
    // Output param real response message length pointer
    koffi.out(ViPUInt32)
])

/**
 * Read message from device
 * @param {number} deviceSession - VISA device session code
 * @param {number} messageLength - Given response message bytes length, default is `256`
 * @returns {string} Response message
 */
export function viRead(deviceSession, messageLength = 256) {
    const messageBuffer = Buffer.alloc(messageLength)
    const realMessageLengthBuffer = Buffer.alloc(4)
    const status = _viRead(deviceSession, messageBuffer, messageLength, realMessageLengthBuffer)
    utils.checkStatus(status)
    const realMessageLength = koffi.decode(realMessageLengthBuffer, ViUInt32)
    return messageBuffer.subarray(0, realMessageLength).toString()
}

// ========== Helper functions ==========

/**
 * Send query to device
 * @param {number} deviceSession - VISA device session code
 * @param {string} message - Query message, must end with `?`, example `*IDN?`
 * @param {number} responseMessageLength - Given response message bytes length, default is `256`
 * @returns {string} - Query message response
 */
export function query(deviceSession, message, responseMessageLength = 256) {
    if (!message.includes('?')) throw new Error(`Query message must end with '?', but got '${message}'`)
    viWrite(deviceSession, message)
    return viRead(deviceSession, responseMessageLength)
}