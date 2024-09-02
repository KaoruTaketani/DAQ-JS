import { Server } from 'http'
import ListenableString from './ListenableString.js'
import ListenableObject from './ListenableObject.js'
import HTTPResponseMaker from './HTTPResponseMaker.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'

const httpRequestUrl = new ListenableString()
const httpResponse = new ListenableObject()
const httpServer = new ListenableObject()

new HTTPResponseMaker(httpResponse, httpRequestUrl)
new HTTPServerRequestHandler(httpServer, httpResponse, httpRequestUrl)
new HTTPServerSetupper(httpServer)

httpServer.assign(new Server())
