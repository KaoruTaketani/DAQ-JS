import koffi from 'koffi'

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/cdaqmx/help_file_title.html
const lib = koffi.load('nicaiu.dll')

// typedef void*              TaskHandle;
const TaskHandle = 'void*'
// typedef uInt32             bool32;
const bool32 = koffi.alias('bool32', 'uint32')
// #define NULL            (0L)
const NULL = 0

const DAQmx_Val_Cfg_Default = -1
const DAQmx_Val_Volts = 10348
const DAQmx_Val_Rising = 10280
const DAQmx_Val_FiniteSamps = 10178
const DAQmx_Val_GroupByChannel = 0
const DAQmx_Val_Seconds = 10364
const DAQmx_Val_Low = 10214

function DAQmxFailed(status) {
    if (status < 0) throw new Error(`DAQmxFailed status: ${status}`)
}

// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcreatetask.html
const DAQmxCreateTask = lib.func('DAQmxCreateTask', 'int32', [
    'string',
    koffi.out(koffi.pointer(TaskHandle))
])

/**
 * @returns {number}
 */
export function createTask() {
    const taskHandle = [null]
    const status = DAQmxCreateTask('', taskHandle)

    DAQmxFailed(status)

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
        ''
    )

    DAQmxFailed(status)
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

export function cfgSampClkTiming(taskHandle, rate, sampsPerChanToAcquire) {
    const status = DAQmxCfgSampClkTiming(
        taskHandle,
        '',
        rate,
        DAQmx_Val_Rising,
        DAQmx_Val_FiniteSamps,
        sampsPerChanToAcquire
    )

    DAQmxFailed(status)
}


// https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxstarttask.html
const DAQmxStartTask = lib.func('DAQmxStartTask', 'int32', [
    TaskHandle // taskHandle
])

export function startTask(taskHandle) {
    const status = DAQmxStartTask(taskHandle)

    DAQmxFailed(status)
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

export function readAnalogF64(taskHandle, readArray) {
    const sampsPerChanRead = [null]
    const timeout = 10.0

    const status = DAQmxReadAnalogF64(
        taskHandle,
        readArray.length,
        timeout,
        DAQmx_Val_GroupByChannel,
        readArray,
        readArray.length,
        sampsPerChanRead,
        NULL
    )

    DAQmxFailed(status)

    return sampsPerChanRead
}


// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxstoptask.html
const DAQmxStopTask = lib.func('DAQmxStopTask', 'int32', [
    TaskHandle // taskHandle
])

export function stopTask(taskHandle) {
    const status = DAQmxStopTask(taskHandle)

    DAQmxFailed(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxcleartask.html
const DAQmxClearTask = lib.func('DAQmxClearTask', 'int32', [
    TaskHandle // taskHandle
])

export function clearTask(taskHandle) {
    const status = DAQmxClearTask(taskHandle)

    DAQmxFailed(status)
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
    // 	DAQmxErrChk (DAQmxCreateCOPulseChanTime(taskHandle,"Dev1/ctr0","",DAQmx_Val_Seconds,DAQmx_Val_Low,1.00,0.50,1.00));
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

    DAQmxFailed(status)
}

// https://www.ni.com/docs/ja-JP/bundle/ni-daqmx-c-api-ref/page/daqmxcfunc/daqmxwaituntiltaskdone.html
const DAQmxWaitUntilTaskDone = lib.func('DAQmxWaitUntilTaskDone', 'int32', [
    TaskHandle,// taskHandle
    'float64'// timeToWait
])

export function waitUntilTaskDone(taskHandle,timeToWait){
    const status = DAQmxWaitUntilTaskDone(
        taskHandle,
        timeToWait
    )

    DAQmxFailed(status)
}