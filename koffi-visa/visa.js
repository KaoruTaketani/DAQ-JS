import koffi from 'koffi'

const VI_SUCCESS = 0
export const VI_TRUE = 1
export const VI_FALSE = 0
const VI_NULL = 0
const VI_HNDLR = 2
const VI_EVENT_IO_COMPLETION = 0x3FFF2009
export const VI_ATTR_RET_COUNT = 0x3FFF4028
export const VI_ATTR_TMO_VALUE = 0x3FFF001A

const ViUInt16 = koffi.alias('ViUInt16', 'uint16')
const ViUInt32 = koffi.alias('ViUInt32', 'uint32')
const ViPUint32 = koffi.pointer(ViUInt32)
const ViUInt64 = koffi.alias('ViUInt64', 'uint64')
const ViPUint64 = koffi.pointer(ViUInt64)
const ViAttrState = koffi.alias('ViAttrState', 'uint64')
const ViEventFilter = ViUInt32
const ViEventType = ViUInt32
// const ViAddr = koffi.pointer(koffi.opaque())
// const ViAddr = koffi.alias('ViAddr', 'void *')
const ViAddr = koffi.pointer('ViAddr',koffi.opaque())
// typedef void        _VI_PTR ViAddr;
const ViAttr = ViUInt32
const ViStatus = ViUInt32
const ViObject = ViUInt32
const ViEvent = ViObject
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
    koffi.out(ViPSession) // sesn
])

/**
 * @returns {number}
 */
export function openDefaultRM() {
    const sesn = [null]
    const status = viOpenDefaultRM(sesn)

    if (status < VI_SUCCESS) {
        console.log('Could not open a session to the VISA Resource Manager!')
        process.exit(1)
    }

    return sesn[0]
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viopen.html
const viOpen = lib.func('viOpen', ViStatus, [
    ViSession, // sesn
    'string', // rsrcName
    ViAccessMode, // accessMode
    ViUInt32, // openTimeout
    koffi.out(ViPSession) // vi
])

/**
 * @param {number} sesn
 * @param {string} rsrcName
 * @returns {number}
 */
export function open(sesn, rsrcName) {
    const vi = [null]
    const status = viOpen(sesn, rsrcName, VI_NULL, VI_NULL, vi)

    if (status < VI_SUCCESS) {
        console.log('Cannot open a session to the device.')
        throw new Error()
    }

    return vi[0]
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/visetattribute.html
const viSetAttribute = lib.func('viSetAttribute', ViStatus, [
    ViObject, // vi
    ViAttr, // attribute
    ViAttrState // attrState
])

/**
 * @param {number} vi
 * @param {number} attribute
 * @param {string} attrState
 * @returns {number}
 */
export function setAttribute(vi, attribute, attrState) {
    const status = viSetAttribute(vi, attribute, attrState)
    return status
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viwrite.html
const viWrite = lib.func('viWrite', ViStatus, [
    ViSession, // vi
    'string', // buf
    ViUInt32, // count
    koffi.out(ViPUint32) // retCount
])

/**
 * @param {number} vi
 * @param {string} buf
 * @returns {number}
 */
export function write(vi, buf) {
    const retCount = [null]
    const status = viWrite(vi, buf, buf.length, retCount)

    if (status < VI_SUCCESS) {
        console.log('Error writing to the device')
        throw new Error()
    }

    return retCount[0]
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viread.html
const viRead = lib.func('viRead', ViStatus, [
    ViSession, // vi
    koffi.out(ViPBuf), // buf
    ViUInt32, // count
    koffi.out(ViPUint32) // retCount
])

/**
 * @param {number} vi
 * @param {number} buf
 * @returns {number}
 */
export function read(vi, buf) {
    const retCount = [null]
    const status = viRead(vi, buf, buf.length, retCount)

    if (status < VI_SUCCESS) {
        console.log('Error reading a response from the device')
    }

    return retCount[0]
}

export function read_async(vi, callback, count = 256) {
    console.log(vi)
    const buf = Buffer.alloc(count)
    const retCount = [null]
    viRead.async(vi, buf, count, retCount, (err, status) => {
        console.log(`err: ${err}, status: ${status}`)
        if (status < VI_SUCCESS) {
            console.log('Error reading a response from the device')
        } else {
            const data = buf.subarray(0, retCount).toString()

            console.log(`Data read: ${data}`)
            callback(data)
        }
    })
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viclose.html
const viClose = lib.func('viClose', ViStatus, [
    ViObject // vi
])

/**
 * @param {number} vi
 * @returns {number}
 */
export function close(vi) {
    const status = viClose(vi)
    return status
}

const callback = koffi.proto('__fastcall', 'callback', ViStatus, [
    ViSession, // vi
    ViEventType, // eventType
    ViEvent, // event
    ViAddr // userHandle
])
const ViHndlr = koffi.pointer(callback)
// typedef ViStatus (_VI_FUNCH _VI_PTR ViHndlr)
//    (ViSession vi, ViEventType eventType, ViEvent event, ViAddr userHandle);

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viinstallhandler.html
const viInstallHandler = lib.func('viInstallHandler', ViStatus, [
    ViSession, // vi
    ViEventType, // eventType
    ViHndlr, // handler
    ViAddr // userHandle
])

/**
 * @param {number} vi
 * @param {function} handler
 * @param {number} userHandle
 * @returns {number}
 */
export function installHandler(vi, handler, userHandle = 0) {
    const handler_ = koffi.register(handler, ViHndlr)
    const status = viInstallHandler(vi, VI_EVENT_IO_COMPLETION, handler_, userHandle)
    if (status < VI_SUCCESS) {
        console.log(`failed installHandler. status: ${status}`)
    }
    return status
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/vienableevent.html
const viEnableEvent = lib.func('viEnableEvent', ViStatus, [
    ViSession, // vi
    ViEventType, // eventType
    ViUInt16, // mechanism
    ViEventFilter // context
])

/**
 * @param {number} vi
 * @returns {number}
 */
export function enableEvent(vi) {
    const status = viEnableEvent(vi, VI_EVENT_IO_COMPLETION, VI_HNDLR, VI_NULL)
    if (status < VI_SUCCESS) {
        console.log(`failed enableEvent. status: ${status}`)
    }
    return status
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/vireadasync.html
const viReadAsync = lib.func('viReadAsync', ViStatus, [
    ViSession, // vi
    koffi.out(ViPBuf), // buf
    ViUInt32, // count
    koffi.out(ViPJobId) // jobId
])

/**
 * @param {number} vi
 * @param {Buffer} buf
 * @returns {number}
 */
export function readAsync(vi, buf) {
    const jobId = [null]
    const status = viReadAsync(vi, buf, buf.length, jobId)

    return jobId[0]
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viterminate.html
const viTerminate = lib.func('viTerminate', ViStatus, [
    ViSession, // vi
    ViUInt16, // degree
    ViJobId // jobId
])

/**
 * @param {number} vi
 * @param {number} jobId
 * @returns {number}
 */
export function terminate(vi, jobId) {
    const status = viTerminate(vi, VI_NULL, jobId)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/vigetattribute.html
const viGetAttribute = lib.func('viGetAttribute', ViStatus, [
    ViObject, // vi
    ViAttr, // attribute
    koffi.out('void *') // void* attrState
])

/**
 * @param {number} vi
 * @param {number} attribute
 * @returns {number}
 */
export function getAttribute(vi, attribute) {
    const attrState = [null]
    const status = viGetAttribute(vi, attribute, koffi.as(attrState, ViPUint32))

    return attrState[0]
}



