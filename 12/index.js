import { Server } from 'http'
import HTTPGetHandler from './HTTPGetHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import StartTimeChanger from './StartTimeChanger.js'
import StartTimeInnerTextChanger from './StartTimeInnerTextChanger.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPGetHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeChanger(variables)
new StartTimeInnerTextChanger(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)
