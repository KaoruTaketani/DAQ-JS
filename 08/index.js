import { Server } from 'http'
import ListenableBoolean from './ListenableBoolean.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import HTTPGetHandler from './HTTPGetHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import WebSocketServerMaker from './WebSocketServerMaker.js'

const randomNumber = new ListenableNumber()
const httpServer = new ListenableObject()
const webSocketServer = new ListenableObject()
const randomNumberGeneratorIsBusy = new ListenableBoolean()

new HTTPGetHandler(httpServer)
new HTTPServerSetupper(httpServer)
new HTTPUpgradeHandler(httpServer, webSocketServer)
new RandomNumberGenerator(randomNumberGeneratorIsBusy, randomNumber)
new RandomNumberInnerTextChanger(randomNumber, webSocketServer)
new WebSocketServerMaker(httpServer, webSocketServer)

httpServer.assign(new Server()) 
randomNumberGeneratorIsBusy.assign(true)
