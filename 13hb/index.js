import { Server } from 'http'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import Variables from './Variables.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import RingBufferConnectionMaker from './RingBufferConnectionMaker.js'
import GetButtonDisabledChanger from './GetButtonDisabledChanger.js'
import RingBufferMessageHandler from './RingBufferMessageHandler.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new GetButtonDisabledChanger(variables)
new RingBufferConnectionMaker(variables)
new RingBufferMessageHandler(variables)

variables.httpServer.assign(new Server())
variables.ringBufferDestinationState.assign('idle')