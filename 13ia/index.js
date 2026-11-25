import Channel1PulseListener from './Channel1PulseListener.js'
import Channel2PulseListener from './Channel2PulseListener.js'
import TCPQueue from './TCPQueue.js'
import Variables from './Variables.js'

const variables = new Variables()

new Channel1PulseListener(variables)
new Channel2PulseListener(variables)

const queue = new TCPQueue(3004, 'localhost', variables.response)

queue.push('pulse?:A:5')
queue.push('pulse?:A:6')
queue.push('pulse?:B:5')

variables.tcpQueue.assign(queue)
