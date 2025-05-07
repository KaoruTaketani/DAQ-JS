import os from 'node:os'
import koffi from 'koffi'

/** NI-VISA lib function returned status code enum */

const VISA_STATUS_ENUM = {
    // Success
    0x3FFF0002: 'VI_SUCCESS_EVENT_EN',
    0x3FFF0003: 'VI_SUCCESS_EVENT_DIS',
    0x3FFF0004: 'VI_SUCCESS_QUEUE_EMPTY',
    0x3FFF0005: 'VI_SUCCESS_TERM_CHAR',
    0x3FFF0006: 'VI_SUCCESS_MAX_CNT',
    0x3FFF007D: 'VI_SUCCESS_DEV_NPRESENT',
    0x3FFF007E: 'VI_SUCCESS_TRIG_MAPPED',
    0x3FFF0080: 'VI_SUCCESS_QUEUE_NEMPTY',
    0x3FFF0098: 'VI_SUCCESS_NCHAIN',
    0x3FFF0099: 'VI_SUCCESS_NESTED_SHARED',
    0x3FFF009A: 'VI_SUCCESS_NESTED_EXCLUSIVE',
    0x3FFF009B: 'VI_SUCCESS_SYNC',

    // Warning
    0x3FFF000C: 'VI_WARN_QUEUE_OVERFLOW',
    0x3FFF0077: 'VI_WARN_CONFIG_NLOADED',
    0x3FFF0082: 'VI_WARN_NULL_OBJECT',
    0x3FFF0084: 'VI_WARN_NSUP_ATTR_STATE',
    0x3FFF0085: 'VI_WARN_UNKNOWN_STATUS',
    0x3FFF0088: 'VI_WARN_NSUP_BUF',
    0x3FFF00A9: 'VI_WARN_EXT_FUNC_NIMPL',

    // Error
    0xbFFF0000: 'VI_ERROR_SYSTEM_ERROR',
    0xbFFF000E: 'VI_ERROR_INV_OBJECT',
    0xbFFF000F: 'VI_ERROR_RSRC_LOCKED',
    0xbFFF0010: 'VI_ERROR_INV_EXPR',
    0xbFFF0011: 'VI_ERROR_RSRC_NFOUND',
    0xbFFF0012: 'VI_ERROR_INV_RSRC_NAME',
    0xbFFF0013: 'VI_ERROR_INV_ACC_MODE',
    0xbFFF0015: 'VI_ERROR_TMO',
    0xbFFF0016: 'VI_ERROR_CLOSING_FAILED',
    0xbFFF001B: 'VI_ERROR_INV_DEGREE',
    0xbFFF001C: 'VI_ERROR_INV_JOB_ID',
    0xbFFF001D: 'VI_ERROR_NSUP_ATTR',
    0xbFFF001E: 'VI_ERROR_NSUP_ATTR_STATE',
    0xbFFF001F: 'VI_ERROR_ATTR_READONLY',
    0x3FFF0020: 'VI_ERROR_INV_LOCK_TYPE',
    0x3FFF0021: 'VI_ERROR_INV_ACCESS_KEY',
    0x3FFF0026: 'VI_ERROR_INV_EVENT',
    0xbFFF0027: 'VI_ERROR_INV_MECH',
    0xbFFF0028: 'VI_ERROR_HNDLR_NINSTALLED',
    0xbFFF0029: 'VI_ERROR_INV_HNDLR_REF',
    0xbFFF002A: 'VI_ERROR_INV_CONTEXT',
    0xbFFF002D: 'VI_ERROR_QUEUE_OVERFLOW',
    0xbFFF002F: 'VI_ERROR_NENABLED',
    0xbFFF0030: 'VI_ERROR_ABORT',
    0xbFFF0034: 'VI_ERROR_RAW_WR_PROT_VIOL',
    0xbFFF0035: 'VI_ERROR_RAW_RD_PROT_VIOL',
    0xbFFF0036: 'VI_ERROR_OUTP_PROT_VIOL',
    0xbFFF0037: 'VI_ERROR_INP_PROT_VIOL',
    0xbFFF0038: 'VI_ERROR_BERR',
    0xbFFF0039: 'VI_ERROR_IN_PROGRESS',
    0xbFFF003A: 'VI_ERROR_INV_SETUP',
    0xbFFF003B: 'VI_ERROR_QUEUE_ERROR',
    0xbFFF003C: 'VI_ERROR_ALLOC',
    0xbFFF003D: 'VI_ERROR_INV_MASK',
    0xbFFF003E: 'VI_ERROR_IO',
    0xbFFF003F: 'VI_ERROR_INV_FMT',
    0xbFFF0041: 'VI_ERROR_NSUP_FMT',
    0xbFFF0042: 'VI_ERROR_LINE_IN_USE',
    0xbFFF0043: 'VI_ERROR_LINE_NRESERVED',
    0xbFFF0046: 'VI_ERROR_NSUP_MODE',
    0xbFFF004A: 'VI_ERROR_SRQ_NOCCURRED',
    0xbFFF004E: 'VI_ERROR_INV_SPACE',
    0xbFFF0051: 'VI_ERROR_INV_OFFSET',
    0xbFFF0052: 'VI_ERROR_INV_WIDTH',
    0xbFFF0054: 'VI_ERROR_NSUP_OFFSET',
    0xbFFF0055: 'VI_ERROR_NSUP_VAR_WIDTH',
    0xbFFF0057: 'VI_ERROR_WINDOW_NMAPPED',
    0xbFFF0059: 'VI_ERROR_RESP_PENDING',
    0xbFFF005F: 'VI_ERROR_NLISTENERS',
    0xbFFF0060: 'VI_ERROR_NCIC',
    0xbFFF0061: 'VI_ERROR_NSYS_CNTLR',
    0xbFFF0067: 'VI_ERROR_NSUP_OPER',
    0xbFFF0068: 'VI_ERROR_INTR_PENDING',
    0xbFFF006A: 'VI_ERROR_ASRL_PARITY',
    0xbFFF006B: 'VI_ERROR_ASRL_FRAMING',
    0xbFFF006C: 'VI_ERROR_ASRL_OVERRUN',
    0xbFFF006E: 'VI_ERROR_TRIG_NMAPPED',
    0xbFFF0070: 'VI_ERROR_NSUP_ALIGN_OFFSET',
    0xbFFF0071: 'VI_ERROR_USER_BUF',
    0xbFFF0072: 'VI_ERROR_RSRC_BUSY',
    0xbFFF0076: 'VI_ERROR_NSUP_WIDTH',
    0xbFFF0078: 'VI_ERROR_INV_PARAMETER',
    0xbFFF0079: 'VI_ERROR_INV_PROT',
    0xbFFF007B: 'VI_ERROR_INV_SIZE',
    0xbFFF0080: 'VI_ERROR_WINDOW_MAPPED',
    0xbFFF0081: 'VI_ERROR_NIMPL_OPER',
    0xbFFF0083: 'VI_ERROR_INV_LENGTH',
    0xbFFF0091: 'VI_ERROR_INV_MODE',
    0xbFFF009C: 'VI_ERROR_SESN_NLOCKED',
    0xbFFF009D: 'VI_ERROR_MEM_NSHARED',
    0xbFFF009E: 'VI_ERROR_LIBRARY_NFOUND',
    0xbFFF009F: 'VI_ERROR_NSUP_INTR',
    0xbFFF00A0: 'VI_ERROR_INV_LINE',
    0xbFFF00A1: 'VI_ERROR_FILE_ACCESS',
    0xbFFF00A2: 'VI_ERROR_FILE_IO',
    0xbFFF00A3: 'VI_ERROR_NSUP_LINE',
    0xbFFF00A4: 'VI_ERROR_NSUP_MECH',
    0xbFFF00A5: 'VI_ERROR_INTF_NUM_NCONFIG',
    0xbFFF00A6: 'VI_ERROR_CONN_LOST',
    0xbFFF00A7: 'VI_ERROR_MACHINE_NAVAIL',
    0xbFFF00A8: 'VI_ERROR_NPERMISSION'
}

/**
 * Check NI-VISA lib function returned status
 * @param {number} statusCode - NI-VISA lib function returned status code
 */
export function checkStatus(statusCode) {
    const statusMessage = VISA_STATUS_ENUM[statusCode]
    if (statusMessage == null) return
    // Success status
    if (statusMessage.startsWith('VI_SUCCESS_')) return
    // Warning status
    if (statusMessage.startsWith('VI_WARN_')) {
        console.warn(`NI-VISA Warning: ${statusMessage} (0x${statusCode.toString(16).toUpperCase()})`)
        return
    }
    // Error status
    if (statusMessage.startsWith('VI_ERROR_')) {
        throw new Error(`NI-VISA Error: ${statusMessage} (0x${statusCode.toString(16).toUpperCase()})`)
    }
}

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
    checkStatus(status)
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
    checkStatus(status)
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
    checkStatus(status)
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
    checkStatus(status)
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
    checkStatus(status)
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