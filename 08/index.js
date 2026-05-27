import { Server } from 'http'
import HTTPGetHandler from './HTTPGetHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import WebSocketServerMaker from './WebSocketServerMaker.js'

const randomNumber = new ListenableNumber()
const httpServer = new ListenableObject()
const webSocketServer = new ListenableObject()
const randomNumberGeneratorDestinationState = new ListenableString()

new HTTPGetHandler(httpServer)
new HTTPServerSetupper(httpServer)
new HTTPUpgradeHandler(httpServer, webSocketServer)
new RandomNumberGenerator(randomNumberGeneratorDestinationState, randomNumber)
new RandomNumberInnerTextChanger(randomNumber, webSocketServer)
new WebSocketServerMaker(httpServer, webSocketServer)

httpServer.assign(new Server()) 
randomNumberGeneratorDestinationState.assign('busy')
