import { openDefaultRM, open, write, read_async, close } from '../koffi/visa.js'

const defaultRM = openDefaultRM()
const data = Buffer.alloc(128)
let instr
instr = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')
write(instr, ':OUTPUT1:STATE?\n')
read_async(instr, data, retCount => {

    console.log(`state: ${data.subarray(0,retCount).toString().trim()}`)
    // close(instr)
    // instr = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')

    write(instr, ':SOURCE1:FUNC?\n')
    read_async(instr, data, retCount => {
        console.log(`func: ${data.subarray(0,retCount).toString().trim()}`)

        close(instr)
        close(defaultRM)
    })
})

