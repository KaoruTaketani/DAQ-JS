import { Server } from 'http'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import TCPQueue from '../13ia/TCPQueue.js'
import Channel1PulseUpdater from './Channel1PulseUpdater.js'
import Channel2Mover from './Channel2Mover.js'
import Channel2PulseUpdater from './Channel2PulseUpdater.js'
import PulseMotorStopper from './PulseMotorStopper.js'
import PulseMotorTableInnerHTMLMaker from './PulseMotorTableInnerHTMLMaker.js'
import Variables from './Variables.js'
import Channel1Mover from './Channel1Mover.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new Channel1PulseUpdater(variables)
new Channel1Mover(variables)
new Channel2PulseUpdater(variables)
new Channel2Mover(variables)
new PulseMotorStopper(variables)
new PulseMotorTableInnerHTMLMaker(variables)

variables.httpServer.assign(new Server())
variables.channel1Destination.assign(Number.NaN)
variables.channel2Destination.assign(Number.NaN)
const queue = new TCPQueue(3004, 'localhost', variables.response)
queue.push('pulse?:A:5')
queue.push('pulse?:A:6')
queue.push('pulse?:B:5')
variables.tcpQueue.assign(queue)
