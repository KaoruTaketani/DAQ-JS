import { Server } from 'http'
import HistogramInitializer from './HistogramInitializer.js'
import HistogramMaker from './HistogramMaker.js'
import TotalInnerTextChanger from './TotalInnerTextChanger.js'
import TotalCounter from './TotalCounter.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import RandomNumberStartDisabledChanger from './RandomNumberStartDisabledChanger.js'
import RandomNumberStopDisabledChanger from './RandomNumberStopDisabledChanger.js'
import Variables from './Variables.js'
import StartTimeInnerTextChanger from './StartTimeInnerTextChanger.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new TotalInnerTextChanger(variables)
new TotalCounter(variables)
new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new RandomNumberStartDisabledChanger(variables)
new RandomNumberStopDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)

variables.httpServer.assign(new Server()) 
