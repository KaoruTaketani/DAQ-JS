import koffi from 'koffi'

const VI_SUCCESS = 0
export const VI_TRUE = 1
export const VI_FALSE = 0
const VI_NULL = 0
const VI_HNDLR = 2
const VI_EVENT_IO_COMPLETION = 0x3FFF2009
export const VI_ATTR_RET_COUNT = 0x3FFF4028

const ViUInt16 = koffi.alias('ViUInt16', 'uint16')
const ViUInt32 = koffi.alias('ViUInt32', 'uint32')
const ViPUint32 = koffi.pointer(ViUInt32)
const ViAttrState = koffi.alias('ViAttrState', 'uint64')
const ViEventFilter = ViUInt32
const ViEventType = ViUInt32
const ViAddr = koffi.pointer(koffi.opaque())
const ViAttr = ViUInt32
const ViStatus = ViUInt32
const ViObject = ViUInt32
const ViEvent = koffi.pointer('ViEvent', ViObject)
const ViJobId = ViUInt32
const ViPJobId = koffi.pointer(ViJobId)
const ViSession = ViUInt32
const ViPSession = koffi.pointer(ViSession)
const ViAccessMode = ViUInt32
const ViByte = koffi.alias('ViByte', 'uchar')
const ViPBuf = koffi.pointer(ViByte)

const lib = koffi.load('visa64.dll')

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viopendefaultrm.html
const viOpenDefaultRM = lib.func('viOpenDefaultRM', ViStatus, [
    koffi.out(ViPSession)
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
    koffi.out(ViPSession)
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

//    status = viSetAttribute(instr, VI_ATTR_TMO_VALUE, 5000);
// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/visetattribute.html
const viSetAttribute = lib.func('viSetAttribute', ViStatus, [
    ViObject,
    ViAttr,
    ViAttrState
])

/**
 * @param {number} driverSession
 * @param {number} attribute
 * @param {string} attrState
 * @returns {number}
 */
export function setAttribute(driverSession,attribute,attrState) {
    const status = viSetAttribute(driverSession,attribute,attrState)
    return status
}
// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viwrite.html
const viWrite = lib.func('viWrite', ViStatus, [
    ViSession,
    'string',
    ViUInt32,
    koffi.out(ViPUint32)
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
    koffi.out(ViPUint32)
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

const callback = koffi.proto('__stdcall', 'callback', ViStatus,
    [ViSession, ViEventType, ViEvent, ViAddr]
)
const ViHndlr = koffi.pointer(callback)
// typedef ViStatus (_VI_FUNCH _VI_PTR ViHndlr)
//    (ViSession vi, ViEventType eventType, ViEvent event, ViAddr userHandle);

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viinstallhandler.html
const viInstallHandler = lib.func('viInstallHandler', ViStatus, [
    ViSession,
    ViEventType,
    ViHndlr,
    ViAddr
])

/**
 * @param {number} sessionCode
 * @param {function} handler
 * @param {number} uhandle
 * @returns {number}
 */
export function installHandler(sessionCode, handler, uhandle = 0) {
    let cb1 = koffi.register(handler, koffi.pointer(callback));
    const status = viInstallHandler(sessionCode, VI_EVENT_IO_COMPLETION, cb1, uhandle)
    if (status < VI_SUCCESS) {
        console.log(`failed installHandler. status: ${status}`)
    }
    return status
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/vienableevent.html
const viEnableEvent = lib.func('viEnableEvent', ViStatus, [
    ViSession,
    ViEventType,
    ViUInt16,
    ViEventFilter
])

/**
 * @param {number} sessionCode
 * @returns {number}
 */
export function enableEvent(sessionCode) {
    const status = viEnableEvent(sessionCode, VI_EVENT_IO_COMPLETION, VI_HNDLR, VI_NULL)
    if (status < VI_SUCCESS) {
        console.log(`failed enableEvent. status: ${status}`)
    }
    return status
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/vireadasync.html
const viReadAsync = lib.func('viReadAsync', ViStatus, [
    ViSession,
    koffi.out(ViPBuf),
    ViUInt32,
    koffi.out(ViPJobId)
])

/**
 * @param {number} sessionCode
 * @param {Buffer} buf
 * @returns {number}
 */
export function readAsync(sessionCode, buf) {
    const jobBuffer = Buffer.alloc(4)

    const status = viReadAsync(sessionCode, buf, buf.length, jobBuffer)
    const job = koffi.decode(jobBuffer, ViUInt32)

    return job
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viterminate.html
const viTerminate = lib.func('viReadAsync', ViStatus, [
    ViSession,
    ViUInt16,
    ViJobId
])

/**
 * @param {number} sessionCode
 * @param {number} job
 * @returns {number}
 */
export function terminate(sessionCode, job) {
    const status = viTerminate(sessionCode, VI_NULL, job);
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/vigetattribute.html
const viGetAttribute = lib.func('viReadAsync', ViStatus, [
    ViObject,
    ViAttr,
    koffi.out(koffi.pointer(koffi.opaque()))
])

/**
 * @param {number} sessionCode
 * @param {number} attribute
 * @returns {number}
 */
export function getAttribute(sessionCode, attribute) {
    const stateBuffer = Buffer.alloc(4)

    const status = viGetAttribute(sessionCode, VI_NULL, job);
    return koffi.decode(stateBuffer, ViUInt32)
}



