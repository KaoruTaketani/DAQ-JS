import { openDefaultRM, open, setAttribute, VI_ATTR_TMO_VALUE, write, read, close } from '../koffi/visa.js'

const defaultRM = openDefaultRM()
const data = Buffer.alloc(128)
let instr
try {
    instr = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')
    setAttribute(instr, VI_ATTR_TMO_VALUE, 5000)
    write(instr, '*IDN?\n')
    const count1 = read(instr, data)
    console.log('Read result:', data.subarray(0, count1).toString().trim())
    // close(instr)
    // instr = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')
    write(instr, ':SOURCE1:FUNC?\n')
    const count2 = read(instr,data)
    console.log('Read result:', data.subarray(0, count2).toString().trim())
} catch (e) {
    console.log(e)
}

close(instr)
close(defaultRM)
