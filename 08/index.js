import { Server } from 'http'
import ListenableBoolean from './ListenableBoolean.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import WebSocketServerMaker from './WebSocketServerMaker.js'

const randomNumber = new ListenableNumber()
const httpServer = new ListenableObject()
const webSocketServer = new ListenableObject()
const randomNumberGeneratorIsBusy = new ListenableBoolean()

new HTTPServerRequestHandler(httpServer)
new HTTPServerSetupper(httpServer)
new HTTPServerUpgradeHandler(httpServer, webSocketServer)
new RandomNumberGenerator(randomNumberGeneratorIsBusy, randomNumber)
new RandomNumberInnerTextChanger(randomNumber, webSocketServer)
new WebSocketServerMaker(httpServer, webSocketServer)

randomNumberGeneratorIsBusy.assign(true)
httpServer.assign(new Server()) 
