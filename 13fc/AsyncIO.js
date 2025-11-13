import { openDefaultRM, open, installHandler, enableEvent, write, readAsync, close, getAttribute, VI_ATTR_RET_COUNT, terminate } from '../koffi/visa.js'
import { VI_FALSE, VI_TRUE } from '../koffi/visa.js'

let stopflag = VI_FALSE
let RdCount = -1

const defaultRM = openDefaultRM()
const inst = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')
const data = Buffer.alloc(4096)
let handle
let first = true
const next = () => {
    if (first) {
        first = false
    } else {

    }
}

installHandler(inst, (vi, etype, event, userHandle) => {
    console.log(`called vi: ${vi}, etype: ${etype}, event: ${event}, userHandle:${userHandle}`)
    RdCount = getAttribute(event, VI_ATTR_RET_COUNT)
    console.log(`RdCount: ${RdCount}`)
    console.log(`Here is the data:  ${data.subarray(0, RdCount).toString()}`)
    stopflag = VI_TRUE

    write(inst, ':SOURCE1:VOLT?\n')
    const job2 = readAsync(inst, data)
    console.log(`job2: ${job2}`)
})
enableEvent(inst)
// write(inst, '*IDN?\n')
// write(inst,':OUTPUT1:PON?\n')
// write(inst,':OUTPUT1:PON ON\n')
// write(inst,':OUTPUT1:STATE?\n')
// write(inst,':OUTPUT1:STATE ON\n')
// write(inst,':SOURCE1:FREQ?\n')
// write(inst,':SOURCE1:VOLT?\n')
// write(inst,':SOURCE1:PHAS?\n')
write(inst, ':SOURCE1:FUNC?\n')
const job1 = readAsync(inst, data)
console.log(`job1: ${job1}`)


console.log('Hit enter to continue.')

process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    // console.log(chunk)

    if (stopflag === VI_TRUE) {
        // console.log(`RdCount: ${RdCount}`)
        // console.log(`Here is the data:  ${data.subarray(0, RdCount).toString()}`)
    } else {
        const status1 = terminate(inst, job1)
        console.log('The asynchronous read did not complete.')
    }

    close(inst)
    close(defaultRM)
})

