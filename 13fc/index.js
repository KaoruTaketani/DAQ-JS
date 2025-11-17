import Channel1PulseListener from './Channel1PulseListener.js'
import Channel2PulseListener from './Channel2PulseListener.js'
import VISAQueueMaker from './VISAQueueMaker.js'
import Variables from './Variables.js'

const variables = new Variables()

new VISAQueueMaker(variables)
new Channel1PulseListener(variables)
new Channel2PulseListener(variables)

variables.tcpParsers.assign(new Map())
variables.channel1Pulse.sync()
variables.channel2Pulse.sync()

