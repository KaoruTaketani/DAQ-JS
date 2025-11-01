import { openDefaultRM, open, write, read_async, close } from './visa.js'

const defaultRM = openDefaultRM()
let instr
try {
    instr = open(defaultRM, 'USB0::0x0D4A::0x000E::9139964::INSTR')
    write(instr, '*IDN?\n')
    const data = read_async(instr, (data) => {

        console.log('Read result:', data)
        close(instr)
        close(defaultRM)
    })
} catch (e) {

}

