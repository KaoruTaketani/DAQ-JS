import { Server } from 'http'
import HTTPResponseMaker from './HTTPResponseMaker.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPResponseMaker(variables)
new HTTPServerRequestHandler(variables)
new HTTPServerUpgradeHandler(variables)
new HTTPServerSetupper(variables)
new RandomNumberGenerator(variables)

variables.httpServer.assign(new Server())
