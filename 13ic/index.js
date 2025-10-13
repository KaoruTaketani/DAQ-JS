import { Server } from 'http'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import Channel1DestinationInnerTextChanger from './Channel1DestinationInnerTextChanger.js'
import Channel1PulseInnerTextChanger from './Channel1PulseInnerTextChanger.js'
import Channel1PulseUpdater from './Channel1PulseUpdater.js'
import Channel2DestinationInnerTextChanger from './Channel2DestinationInnerTextChanger.js'
import Channel2Mover from './Channel2Mover.js'
import Channel2PulseInnerTextChanger from './Channel2PulseInnerTextChanger.js'
import Channel2PulseUpdater from './Channel2PulseUpdater.js'
import SocketQueue from './SocketQueue.js'
import ThetaDestinationValueChanger from './ThetaDestinationValueChanger.js'
import ThetaPulseInnerTextChanger from './ThetaPulseInnerTextChanger.js'
import Variables from './Variables.js'
import XDestinationValueChanger from './XDestinationValueChanger.js'
import XMover from './XMover.js'
import XPulseInnerTextChanger from './XPulseInnerTextChanger.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new XMover(variables)
new XDestinationValueChanger(variables)
new XPulseInnerTextChanger(variables)
new ThetaDestinationValueChanger(variables)
new ThetaPulseInnerTextChanger(variables)
new Channel1PulseUpdater(variables)
new Channel1PulseInnerTextChanger(variables)
new Channel1DestinationInnerTextChanger(variables)
new Channel2PulseUpdater(variables)
new Channel2PulseInnerTextChanger(variables)
new Channel2DestinationInnerTextChanger(variables)
new Channel2Mover(variables)

variables.httpServer.assign(new Server()) 
variables.socketQueue.assign(new SocketQueue())
variables.channel1Destination.assign(Number.NaN)
variables.channel1Pulse.assign(Number.NaN)
variables.channel2Destination.assign(Number.NaN)
variables.channel2Pulse.assign(Number.NaN)

