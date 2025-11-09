import { Server } from 'http'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import CenterDestinationInnerTextChanger from './CenterDestinationInnerTextChanger.js'
import CenterInMillimetersInnerTextChanger from './CenterInMillimetersInnerTextChanger.js'
import CenterInMillimetersUpdater from './CenterInMillimetersUpdater.js'
import Channel1DestinationInnerTextChanger from './Channel1DestinationInnerTextChanger.js'
import Channel1PulseInnerTextChanger from './Channel1PulseInnerTextChanger.js'
import Channel1PulseUpdater from './Channel1PulseUpdater.js'
import Channel2DestinationInnerTextChanger from './Channel2DestinationInnerTextChanger.js'
import Channel2Mover from './Channel2Mover.js'
import Channel2PulseInnerTextChanger from './Channel2PulseInnerTextChanger.js'
import Channel2PulseUpdater from './Channel2PulseUpdater.js'
import SocketQueue from './SocketQueue.js'
import Variables from './Variables.js'
import WidthDestinationInnerTextChanger from './WidthDestinationInnerTextChanger.js'
import WidthInMillimetersInnerTextChanger from './WidthInMillimetersInnerTextChanger.js'
import WidthInMillimetersUpdater from './WidthInMillimetersUpdater.js'
import XMover from './XMover.js'
import PulseMotorStopper from './PulseMotorStopper.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new XMover(variables)
new Channel1PulseUpdater(variables)
new Channel1PulseInnerTextChanger(variables)
new Channel1DestinationInnerTextChanger(variables)
new Channel2PulseUpdater(variables)
new Channel2PulseInnerTextChanger(variables)
new Channel2DestinationInnerTextChanger(variables)
new Channel2Mover(variables)
new CenterDestinationInnerTextChanger(variables)
new CenterInMillimetersInnerTextChanger(variables)
new CenterInMillimetersUpdater(variables)
new WidthInMillimetersInnerTextChanger(variables)
new WidthInMillimetersUpdater(variables)
new WidthDestinationInnerTextChanger(variables)
new PulseMotorStopper(variables)

variables.httpServer.assign(new Server())
variables.socketQueue.assign(new SocketQueue(23, 'localhost'))
variables.centerDestination.assign(Number.NaN)
variables.widthDestination.assign(Number.NaN)
variables.channel1Destination.assign(Number.NaN)
variables.channel1Pulse.assign(Number.NaN)
variables.channel2Destination.assign(Number.NaN)
variables.channel2Pulse.assign(Number.NaN)

