import koffi from 'koffi'

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/cdaqmx/help_file_title.html
const lib = koffi.load('nicaiu.dll')

// typedef void*              TaskHandle;
const TaskHandle = 'void*'
// typedef uInt32             bool32;
const bool32 = 'uint32'
// #define NULL            (0L)
const NULL = 0
// #define CVICDECL        __cdecl
// #define CVICALLBACK     CVICDECL
// typedef int32 (CVICALLBACK *DAQmxDoneEventCallbackPtr)(TaskHandle taskHandle, int32 status, void *callbackData);
// int32 CVICALLBACK DoneCallback(TaskHandle taskHandle, int32 status, void *callbackData);
const DoneEventCallback = koffi.proto('__cdecl','DAQmxDoneEventCallback', 'int32', [
    TaskHandle, //taskHandle
    'int32', // status
    'void*' // callbackData
])
const DAQmxDoneEventCallbackPtr = koffi.pointer(DoneEventCallback)
// typedef int32 (CVICALLBACK *DAQmxEveryNSamplesEventCallbackPtr)(TaskHandle taskHandle, int32 everyNsamplesEventType, uInt32 nSamples, void *callbackData);
// int32 CVICALLBACK EveryNCallback(TaskHandle taskHandle, int32 everyNsamplesEventType, uInt32 nSamples, void *callbackData);
const EveryNCallback = koffi.proto('__cdecl','EveryNCallback', 'int32', [
    TaskHandle, // taskHandle
    'int32', // everyNsamplesEventType
    'uint32', // nSamples
    'void*'// callbackData
])
const DAQmxEveryNSamplesEventCallbackPtr = koffi.pointer(EveryNCallback)

const DAQmx_Val_Cfg_Default = -1
const DAQmx_Val_Volts = 10348
const DAQmx_Val_RisingSlope = 10280
const DAQmx_Val_Rising = DAQmx_Val_RisingSlope
const DAQmx_Val_FallingSlope = 10171
const DAQmx_Val_Falling = DAQmx_Val_FallingSlope
export const DAQmx_Val_FiniteSamps = 10178
export const DAQmx_Val_ContSamps = 10123
export const DAQmx_Val_GroupByChannel = 0
export const DAQmx_Val_GroupByScanNumber = 1
const DAQmx_Val_Seconds = 10364
const DAQmx_Val_Low = 10214
const DAQmx_Val_Hz = 10373
const DAQmx_Val_Acquired_Into_Buffer = 1


// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxgetextendederrorinfo.html
const DAQmxGetExtendedErrorInfo = lib.func('DAQmxGetExtendedErrorInfo', 'int32', [
    koffi.out('char*'), // errorString
    'uint32' // bufferSize
])

function DAQmxFailed(status){
    return state < 0
}

function DAQmxErrChk(status) {
    if (DAQmxFailed(status)) {
        const size = DAQmxGetExtendedErrorInfo(NULL, 0)
        const errBuf = Buffer.alloc(size)
        DAQmxGetExtendedErrorInfo(errBuf, errBuf.length)
        console.log(errBuf.toString())
        throw new Error(`DAQmxFailed status: ${status}`)
    }
}

// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcreatetask.html
const DAQmxCreateTask = lib.func('DAQmxCreateTask', 'int32', [
    'string', // taskName
    koffi.out(koffi.pointer(TaskHandle)) // taskHandle
])

/**
 * @returns {number}
 */
export function createTask() {
    const taskHandle = [null]
    const status = DAQmxCreateTask('', taskHandle)

    DAQmxErrChk(status)

    return taskHandle[0]
}

// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcreateaivoltagechan.html
const DAQmxCreateAIVoltageChan = lib.func('DAQmxCreateAIVoltageChan', 'int32', [
    TaskHandle, // taskHandle
    'string', // physicalChannel
    'string', // nameToAssignChannel
    'int32', // terminalConfig
    'float64', // minVal
    'float64', // maxVal
    'int32', //scale
    'string' //customScaleName
])

export function createAIVoltageChan(taskHandle, physicalChannel) {
    const status = DAQmxCreateAIVoltageChan(
        taskHandle,
        physicalChannel,
        '',
        DAQmx_Val_Cfg_Default,
        -10.0,
        10.0,
        DAQmx_Val_Volts,
        NULL
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcfgsampclktiming.html
const DAQmxCfgSampClkTiming = lib.func('DAQmxCfgSampClkTiming', 'int32', [
    TaskHandle, // taskHandle
    'string', // source
    'float64', // rate
    'int32', // activeEdge
    'int32', // sampleMode
    'uint64' // sampsPerChanToAcquire
])

export function cfgSampClkTiming(taskHandle, rate, sampleMode, sampsPerChanToAcquire) {
    const status = DAQmxCfgSampClkTiming(
        taskHandle,
        '',
        rate,
        DAQmx_Val_Rising,
        sampleMode,
        sampsPerChanToAcquire
    )

    DAQmxErrChk(status)
}


// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxstarttask.html
const DAQmxStartTask = lib.func('DAQmxStartTask', 'int32', [
    TaskHandle // taskHandle
])

export function startTask(taskHandle) {
    const status = DAQmxStartTask(taskHandle)

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxreadanalogf64.html
const DAQmxReadAnalogF64 = lib.func('DAQmxReadAnalogF64', 'int32', [
    TaskHandle, // taskHandle
    'int32', // numSampsPerChan
    'float64', // timeout
    bool32, // fillMode
    koffi.out(koffi.pointer(koffi.array('float64', 'count', 1024 /* max length */))), // readArray
    'uint32', // arraySizeInSamps
    koffi.out(koffi.pointer('int32')), // sampsPerChanRead
    bool32 // reserved
])

export function readAnalogF64(taskHandle, fillMode, readArray) {
    const sampsPerChanRead = [null]
    const timeout = 10.0
    const status = DAQmxReadAnalogF64(
        taskHandle,
        readArray.length,
        timeout,
        fillMode,
        readArray,
        readArray.length,
        sampsPerChanRead,
        NULL
    )

    DAQmxErrChk(status)

    return sampsPerChanRead[0]
}


// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxstoptask.html
const DAQmxStopTask = lib.func('DAQmxStopTask', 'int32', [
    TaskHandle // taskHandle
])

export function stopTask(taskHandle) {
    const status = DAQmxStopTask(taskHandle)

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcleartask.html
const DAQmxClearTask = lib.func('DAQmxClearTask', 'int32', [
    TaskHandle // taskHandle
])

export function clearTask(taskHandle) {
    const status = DAQmxClearTask(taskHandle)

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcreatecopulsechantime.html
const DAQmxCreateCOPulseChanTime = lib.func('DAQmxCreateCOPulseChanTime', 'int32', [
    TaskHandle, // taskHandle
    'string', // counter
    'string', // nameToAssignToChannel
    'int32', // units
    'int32', // idleState
    'float64', // initialDelay
    'float64', // lowTime
    'float64' // highTime
])

export function createCOPulseChanTime(taskHandle, counter) {
    const initialDelay = 1.00
    const lowTime = 0.50
    const highTime = 1.00
    const status = DAQmxCreateCOPulseChanTime(
        taskHandle,
        counter,
        '',
        DAQmx_Val_Seconds,
        DAQmx_Val_Low,
        initialDelay,
        lowTime,
        highTime
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxwaituntiltaskdone.html
const DAQmxWaitUntilTaskDone = lib.func('DAQmxWaitUntilTaskDone', 'int32', [
    TaskHandle,// taskHandle
    'float64'// timeToWait
])

export function waitUntilTaskDone(taskHandle, timeToWait) {
    const status = DAQmxWaitUntilTaskDone(
        taskHandle,
        timeToWait
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcreatecopulsechanfreq.html
const DAQmxCreateCOPulseChanFreq = lib.func('DAQmxCreateCOPulseChanFreq', 'int32', [
    TaskHandle, // taskHandle
    'string', // counter
    'string', // nameToAssignToChannel
    'int32', // units
    'int32', // idleState
    'float64', // initialDelay
    'float64', // freq
    'float64' // dutyCycle
])

export function createCOPulseChanFreq(taskHandle, counter) {
    const initialDelay = 0.0
    const freq = 1.00
    const dutyCycle = 0.05
    const status = DAQmxCreateCOPulseChanFreq(
        taskHandle,
        counter,
        '',
        DAQmx_Val_Hz,
        DAQmx_Val_Low,
        initialDelay,
        freq,
        dutyCycle
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcfgimplicittiming.html
const DAQmxCfgImplicitTiming = lib.func('DAQmxCfgImplicitTiming', 'int32', [
    TaskHandle, //taskHandle
    'int32', // sampleMode
    'uint64' // sampsPerChanToAcquire
])

export function cfgImplicitTiming(taskHandle, sampsPerChanToAcquire) {
    const status = DAQmxCfgImplicitTiming(
        taskHandle,
        DAQmx_Val_ContSamps,
        sampsPerChanToAcquire
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxregisterdoneevent.html
const DAQmxRegisterDoneEvent = lib.func('DAQmxRegisterDoneEvent', 'int32', [
    TaskHandle, //taskHandle
    'uint32', // options
    DAQmxDoneEventCallbackPtr,//  callbackFunction
    'void*' // callbackData
])

export function registerDoneEvent(taskHandle, callbackFunction) {
    const options = 0
    const cb = koffi.register(callbackFunction, DAQmxDoneEventCallbackPtr)
    const status = DAQmxRegisterDoneEvent(
        taskHandle,
        options,
        cb,
        NULL
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/mxcprop/func18e1.html
const DAQmxSetCOPulseTerm = lib.func('DAQmxSetCOPulseTerm', 'int32', [
    TaskHandle, //taskHandle
    'string', // channel
    'string' // data
])

export function setCOPulseTerm(taskHandle, channel, data) {
    const status = DAQmxSetCOPulseTerm(
        taskHandle,
        channel,
        data
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxregistereverynsamplesevent.html
const DAQmxRegisterEveryNSamplesEvent = lib.func('DAQmxRegisterEveryNSamplesEvent', 'int32', [
    TaskHandle, // taskHandle
    'int32',// everyNsamplesEventType
    'uint32',// nSamples
    'uint32',// options
    DAQmxEveryNSamplesEventCallbackPtr, // callbackFunction
    'void*'// callbackData
])

export function registerEveryNSamplesEvent(taskHandle, nSamples, callbackFunction) {
    const options = 0
    const cb = koffi.register(callbackFunction, DAQmxEveryNSamplesEventCallbackPtr)
    const status = DAQmxRegisterEveryNSamplesEvent(
        taskHandle,
        DAQmx_Val_Acquired_Into_Buffer,
        nSamples,
        options,
        cb,
        NULL
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcfgdigedgereftrig.html
const DAQmxCfgDigEdgeRefTrig = lib.func('DAQmxCfgDigEdgeRefTrig', 'int32', [
    TaskHandle, // taskHandle
    'string', // triggerSource
    'int32', // triggerEdge
    'uint32' // pretriggerSamples
])

export function cfgDigEdgeRefTrig(taskHandle, triggerSource, pretriggerSamples) {
    const status = DAQmxCfgDigEdgeRefTrig(
        taskHandle,
        triggerSource,
        DAQmx_Val_Rising,
        pretriggerSamples
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcfgdigedgestarttrig.html
const DAQmxCfgDigEdgeStartTrig = lib.func('DAQmxCfgDigEdgeStartTrig', 'int32', [
    TaskHandle, // taskHandle
    'string', // triggerSource
    'int32' // triggerEdge
])

export function cfgDigEdgeStartTrig(taskHandle, triggerSource) {
    const status = DAQmxCfgDigEdgeStartTrig(
        taskHandle,
        triggerSource,
        DAQmx_Val_Rising
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/mxcprop/func190f.html
const DAQmxSetStartTrigRetriggerable = lib.func('DAQmxSetStartTrigRetriggerable', 'int32', [
    TaskHandle, // taskHandle
    bool32 // data
])

export function setStartTrigRetriggerable(taskHandle, data) {
    const status = DAQmxSetStartTrigRetriggerable(
        taskHandle,
        data
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcfganlgedgestarttrig.html
const DAQmxCfgAnlgEdgeStartTrig = lib.func('DAQmxCfgAnlgEdgeStartTrig', 'int32', [
    TaskHandle,// taskHandle
    'string',// triggerSource
    'int32',// triggerSlope
    'float64'// triggerLevel
])

export function cfgAnlgEdgeStartTrig(taskHandle, triggerSource) {
    const triggerLevel = 1.0

    const status = DAQmxCfgAnlgEdgeStartTrig(
        taskHandle,
        triggerSource,
        DAQmx_Val_Falling,
        triggerLevel
    )

    DAQmxErrChk(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/mxcprop/func1395.html
const DAQmxSetAnlgEdgeStartTrigHyst = lib.func('DAQmxSetAnlgEdgeStartTrigHyst', 'int32', [
    TaskHandle, // taskHandle
    'float64' // data
])

export function setAnlgEdgeStartTrigHyst(taskHandle, data) {
    const status = DAQmxSetAnlgEdgeStartTrigHyst(
        taskHandle,
        data
    )

    DAQmxErrChk(status)
}

