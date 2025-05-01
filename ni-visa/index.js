import * as NiVisa from 'node-ni-visa'

const driverSession = NiVisa.viOpenDefaultRM()
const deviceSession = NiVisa.viOpen(driverSession, 'USB0::0x0D4A::0x000E::9139964::INSTR')

console.log('Write result:', NiVisa.viWrite(deviceSession, '*IDN?\n'))
console.log('Read result:', NiVisa.viRead(deviceSession))

const queryMessage = '*IDN?\n'
console.log(`Query '${queryMessage}' -> '${NiVisa.query(deviceSession, queryMessage)}'`)

NiVisa.viClose(deviceSession)
NiVisa.viClose(driverSession)

