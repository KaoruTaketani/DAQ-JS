import { Server } from 'http'
import AttributesSender from './AttributesSender.js'
import ContrastSender from './ContrastSender.js'
import HTTPRequestHandler from './HTTPRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import ImageSender from './ImageSender.js'
import NeutronRateSender from './NeutronRateSender.js'
import ServerVariables from './ServerVariables.js'
import TableSender from './TableSender.js'
import VelocitySender from './VelocitySender.js'

const variables = new ServerVariables()
new HTTPRequestHandler(variables)
new HTTPUpgradeHandler(variables)
new HTTPServerSetupper(variables)
new AttributesSender(variables)
new ContrastSender(variables)
new ImageSender(variables)
new NeutronRateSender(variables)
new TableSender(variables)
new VelocitySender(variables)

variables.hdf5Path.assign('../../hdf5/mieze')
variables.httpServer.assign(new Server())


