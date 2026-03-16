import { DAQmx_Val_GroupByChannel, DAQmx_Val_FiniteSamps, createTask, createAIVoltageChan, cfgSampClkTiming, startTask, readAnalogF64, stopTask, clearTask, cfgDigEdgeRefTrig } from '../koffi/daqmx.js'
import { parentPort } from 'worker_threads'

let taskHandle = 0
const data = new Float64Array(300)
taskHandle = createTask()
createAIVoltageChan(taskHandle, 'Dev1/ai20')
cfgSampClkTiming(taskHandle, 1000, DAQmx_Val_FiniteSamps, data.length)
cfgDigEdgeRefTrig(taskHandle, '/Dev1/PFI7', 100)

parentPort.on('message', value => {
    if (value) {
        startTask(taskHandle)
        readAnalogF64(taskHandle, DAQmx_Val_GroupByChannel, data)
        parentPort.postMessage(data)
        stopTask(taskHandle)
        setImmediate(() => {
            parentPort.emit('message', true)
        })
    } else {
        clearTask(taskHandle)
        process.exit()
    }
})
