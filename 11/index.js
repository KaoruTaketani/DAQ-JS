import { Server } from 'http'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import StartTimeInnerTextChanger from './StartTimeInnerTextChanger.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new StartTimeInnerTextChanger(variables)


variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(true)