import { viOpenDefaultRM, viOpen, viWrite, viRead, viClose } from './ni-visa.js'
import VISAQueue from './VISAQueue.js'

const queue = new VISAQueue()
// queue.push((deviceSession, done) => {
//     console.log('Write result:', viWrite(deviceSession, '*IDN?\n'))
//     console.log('Read result:', viRead(deviceSession))
//     done()
// })
queue.push(deviceSession => {
    console.log('Write result:', viWrite(deviceSession, '*IDN?\n'))
    console.log('Read result:', viRead(deviceSession))
})
