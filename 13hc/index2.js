import VISAQueue2 from './VISAQueue2.js'

const queue = new VISAQueue2()
console.log(`func: ${queue.query(':SOURCE1:FUNC?\n')}`)
console.log(`freq: ${queue.query(':SOURCE1:FREQ?\n')}`)
console.log(`output: ${queue.query(':OUTPUT1:STATE?\n')}`)
queue.write(':OUTPUT1:STATE ON\n')
console.log(`output ${queue.query(':OUTPUT1:STATE?\n')}`)
console.log(`volt: ${queue.query(':SOURCE1:VOLT?\n')}`)
console.log(`phase: ${queue.query(':SOURCE1:PHAS?\n')}`)
