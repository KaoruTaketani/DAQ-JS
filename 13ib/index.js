import Channel1PulseListener from '../13ia/Channel1PulseListener.js'
import Channel2PulseListener from '../13ia/Channel2PulseListener.js'
import VISAQueue from './VISAQueue.js'
import Variables from './Variables.js'

const variables = new Variables()

new Channel1PulseListener(variables)
new Channel2PulseListener(variables)

const queue = new VISAQueue('TCPIP0::127.0.0.1::3004::SOCKET', variables.response)

queue.push('pulse?:A:5')
queue.push('pulse?:A:6')
queue.push('pulse?:B:5')

variables.visaQueue.assign(queue)
