import VISAQueue from './VISAQueue2.js'

const queue = new VISAQueue()
console.log(`func: ${queue.query(':SOURCE1:FUNC?\n')}`)
console.log(`freq: ${queue.query(':SOURCE1:FREQ?\n')}`)
console.log(`output: ${queue.query(':OUTPUT1:STATE?\n')}`)
queue.write(':OUTPUT1:STATE ON\n')
console.log(`output ${queue.query(':OUTPUT1:STATE?\n')}`)
console.log(`freq: ${queue.query(':SOURCE1:VOLT?\n')}`)
console.log(`freq: ${queue.query(':SOURCE1:PHAS?\n')}`)
