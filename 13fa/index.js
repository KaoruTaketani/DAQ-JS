import { Server } from 'http'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import ImageSrcMaker from './ImageSrcMaker.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new ImageSrcMaker(variables)

variables.httpServer.assign(new Server())
variables.cmin.assign(0)
variables.cmax.assign(4)