import HTTPRequestHandler from './HTTPRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import ServerVariables from './ServerVariables.js'
import { Server } from 'http'

const variables = new ServerVariables()

new HTTPRequestHandler(variables)
new HTTPUpgradeHandler(variables)
new HTTPServerSetupper(variables)

variables.httpServer.assign(new Server())