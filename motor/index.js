import { Server } from 'http'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import Variables from './Variables.js'
import Initializer from './Initializer.js'
import XMover from './XMover.js'
import XDestinationValueChanger from './XDestinationValueChanger.js'
import XPulseInnerTextChanger from './XPulseInnerTextChanger.js'
import ThetaDestinationValueChanger from './ThetaDestinationValueChanger.js'
import ThetaPulseInnerTextChanger from './ThetaPulseInnerTextChanger.js'

const variables = new Variables()

new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new Initializer(variables)
new XMover(variables)
new XDestinationValueChanger(variables)
new XPulseInnerTextChanger(variables)
new ThetaDestinationValueChanger(variables)
new ThetaPulseInnerTextChanger(variables)

variables.httpServer.assign(new Server()) 
