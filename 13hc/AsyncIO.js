import { openDefaultRM, register, unregister, open, installHandler, enableEvent, write, readAsync, close, getAttribute, VI_ATTR_RET_COUNT, terminate, uninstallHandler } from '../koffi/visa.js'
import { VI_FALSE, VI_TRUE } from '../koffi/visa.js'

let stopflag = VI_FALSE
let RdCount = -1

const defaultRM = openDefaultRM()
const inst = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')
const data = Buffer.alloc(4096)
const msg = []

const first = register((vi, etype, event, userHandle) => {
    console.log(`called vi: ${vi}, etype: ${etype}, event: ${event}, userHandle:${userHandle}`)
    RdCount = getAttribute(event, VI_ATTR_RET_COUNT)
    console.log(`RdCount: ${RdCount}`)
    console.log(`Here is the data: ${msg.shift()} is ${data.subarray(0, RdCount).toString()}`)
    stopflag = VI_TRUE

    // console.loo('x')
    // uninstallHandler(vi,first)
    // console.loo('y')
    // installHandler(vi,second)
    // console.loo('z')

    // following code is necessary to prevent warning
    return 0
})
const second = register((vi, etype, event, userHandle) => {
    console.log(`called vi: ${vi}, etype: ${etype}, event: ${event}, userHandle:${userHandle}`)
    RdCount = getAttribute(event, VI_ATTR_RET_COUNT)
    console.log(`RdCount: ${RdCount}`)
    console.log(`Here is the data:  ${data.subarray(0, RdCount).toString()}`)
})
installHandler(inst, first)
enableEvent(inst)
// write(inst, '*IDN?\n')
// write(inst,':OUTPUT1:PON?\n')
// write(inst,':OUTPUT1:PON ON\n')
// write(inst,':OUTPUT1:STATE?\n')
// write(inst,':OUTPUT1:STATE ON\n')
// write(inst,':SOURCE1:FREQ?\n')
// write(inst,':SOURCE1:VOLT?\n')
// write(inst,':SOURCE1:PHAS?\n')
msg.push('func')
write(inst, ':SOURCE1:FUNC?\n')
const job1 = readAsync(inst, data)
console.log(`job1: ${job1}`)
setTimeout(() => {
    msg.push('volt')
    write(inst, ':SOURCE1:VOLT?\n')
    const job2 = readAsync(inst, data)
    console.log(`job2: ${job2}`)

    setTimeout(() => {
        msg.push('freq')
        write(inst, ':SOURCE1:FREQ?\n')
        const job3 = readAsync(inst, data)
        console.log(`job3: ${job3}`)

        setTimeout(() => {
            msg.push('phase')
            write(inst, ':SOURCE1:PHAS?\n')
            const job4 = readAsync(inst, data)
            console.log(`job4: ${job4}`)

        }, 10)
    }, 10)
}, 10)




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

