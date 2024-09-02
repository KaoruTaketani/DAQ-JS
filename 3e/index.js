import { Server } from 'http'
import HTTPResponseMaker from './HTTPResponseMaker.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPResponseMaker(variables)
new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)

variables.httpServer.assign(new Server())
