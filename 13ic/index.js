import { Server } from 'http'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import TCPQueue from '../13ia/TCPQueue.js'
import Channel1DestinationInnerTextChanger from './Channel1DestinationInnerTextChanger.js'
import Channel1PulseInnerTextChanger from './Channel1PulseInnerTextChanger.js'
import Channel1PulseUpdater from './Channel1PulseUpdater.js'
import Channel2DestinationInnerTextChanger from './Channel2DestinationInnerTextChanger.js'
import Channel2Mover from './Channel2Mover.js'
import Channel2PulseInnerTextChanger from './Channel2PulseInnerTextChanger.js'
import Channel2PulseUpdater from './Channel2PulseUpdater.js'
import PulseMotorStopper from './PulseMotorStopper.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new Channel1PulseUpdater(variables)
new Channel1PulseInnerTextChanger(variables)
new Channel1DestinationInnerTextChanger(variables)
new Channel2PulseUpdater(variables)
new Channel2PulseInnerTextChanger(variables)
new Channel2DestinationInnerTextChanger(variables)
new Channel2Mover(variables)
new PulseMotorStopper(variables)

variables.httpServer.assign(new Server())

const queue = new TCPQueue(3004, 'localhost', variables.response)
queue.push('pulse?:A:5')
queue.push('pulse?:A:6')
queue.push('pulse?:B:5')
variables.tcpQueue.assign(queue)
