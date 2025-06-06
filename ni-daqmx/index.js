import { viOpenDefaultRM, viOpen, viWrite, viRead, viClose } from './ni-visa.js'

const driverSession = viOpenDefaultRM()
const deviceSession = viOpen(driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')

console.log('Write result:', viWrite(deviceSession, '*IDN?\n'))
console.log('Read result:', viRead(deviceSession))

viClose(deviceSession)
viClose(driverSession)

console.log('ni-daqmx')
