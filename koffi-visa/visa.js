import koffi from 'koffi'

const VI_SUCCESS = 0
export const VI_TRUE = 1
export const VI_FALSE = 0
const VI_NULL = 0
const VI_HNDLR = 2
const VI_EVENT_IO_COMPLETION = 0x3FFF2009
export const VI_ATTR_RET_COUNT = 0x3FFF4028
export const VI_ATTR_TMO_VALUE = 0x3FFF001A
const VI_ANY_HNDLR = 0

const ViUInt16 = 'uint16'
const ViUInt32 = 'uint32'
const ViPUint32 = koffi.pointer(ViUInt32)
const ViAttrState = 'uint64'
const ViEventFilter = ViUInt32
const ViEventType = ViUInt32
// typedef void        _VI_PTR ViAddr;
const ViAddr = koffi.pointer('ViAddr', koffi.opaque())
const ViAttr = ViUInt32
const ViStatus = ViUInt32
const ViObject = ViUInt32
const ViEvent = ViObject
const ViJobId = ViUInt32
const ViPJobId = koffi.pointer(ViJobId)
const ViSession = ViUInt32
const ViPSession = koffi.pointer(ViSession)
const ViAccessMode = ViUInt32
const ViByte = 'uchar'
const ViPBuf = koffi.pointer(ViByte)
// typedef ViStatus (_VI_FUNCH _VI_PTR ViHndlr)
//    (ViSession vi, ViEventType eventType, ViEvent event, ViAddr userHandle);
const AsyncHandler = koffi.proto('__fastcall', 'AsyncHandler', ViStatus, [
    ViSession, // vi
    ViEventType, // eventType
    ViEvent, // event
    ViAddr // userHandle
])
const ViHndlr = koffi.pointer(AsyncHandler)

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
        throw new Error(`failed openDefaultRM. status: ${status}`)
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
        throw new Error(`failed open. status: ${status}`)
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
 */
export function setAttribute(vi, attribute, attrState) {
    const status = viSetAttribute(vi, attribute, attrState)

    if (status < VI_SUCCESS) {
        throw new Error(`failed setAttribute. status: ${status}`)
    }
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
        throw new Error(`failed writec. status: ${status}`)
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
        throw new Error(`failed read. status: ${status}`)
    }

    return retCount[0]
}

export function read_async(vi, buf, callback, count = 256) {
    const retCount = [null]
    viRead.async(vi, buf, buf.length, retCount, (err, status) => {
        if (err) throw err

        if (status < VI_SUCCESS) {
            throw new Error(`failed read_async. status: ${status}`)
        }

        callback(retCount[0])
    })
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viclose.html
const viClose = lib.func('viClose', ViStatus, [
    ViObject // vi
])

/**
 * @param {number} vi
 */
export function close(vi) {
    const status = viClose(vi)

    if (status < VI_SUCCESS) {
        throw new Error('failed close')
    }
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viinstallhandler.html
const viInstallHandler = lib.func('viInstallHandler', ViStatus, [
    ViSession, // vi
    ViEventType, // eventType
    ViHndlr, // handler
    ViAddr // userHandle
])

/**
 * @param {number} vi
 * @param {number} handle
 */
export function installHandler(vi, handle) {
    const status = viInstallHandler(vi, VI_EVENT_IO_COMPLETION, handle, 0)

    if (status < VI_SUCCESS) {
        throw new Error(`failed installHandler. status: ${status}`)
    }
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
 */
export function enableEvent(vi) {
    const status = viEnableEvent(vi, VI_EVENT_IO_COMPLETION, VI_HNDLR, VI_NULL)

    if (status < VI_SUCCESS) {
        throw new Error(`failed enableEvent. status: ${status}`)
    }
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

    if (status < VI_SUCCESS) {
        throw new Error(`failed readAsync. status: ${status}`)
    }

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
 */
export function terminate(vi, jobId) {
    const status = viTerminate(vi, VI_NULL, jobId)

    if (status < VI_SUCCESS) {
        throw new Error(`failed in terminate. status: ${status}`)
    }
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

    if (status < VI_SUCCESS) {
        throw new Error(`failed in getAttribute. status: ${status}`)
    }

    return attrState[0]
}

// https://www.ni.com/docs/ja-JP/bundle/ni-visa-api-ref/page/ni-visa-api-ref/viuninstallhandler.html
const viUninstallHandler = lib.func('viUninstallHandler', ViStatus, [
    ViSession, // vi
    ViEventType, // eventType
    ViHndlr, // handler
    ViAddr // userHandle
])

/**
 * @param {number} vi
 * @param {number} handle
 */
export function uninstallHandler(vi, handle) {
    const status = viUninstallHandler(vi, VI_EVENT_IO_COMPLETION, handle, 0)

    if (status < VI_SUCCESS) {
        throw new Error(`failed uninstallHandler. status: ${status}`)
    }
}

export function register(handler){
    return koffi.register(handler, ViHndlr)
}

export function unregister(handle){
    koffi.unregister(handle)
}