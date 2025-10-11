import { Server } from 'http'
import RandomNumberGenerator from '../13//RandomNumberGenerator.js'
import HistogramInitializer from '../13/HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../13/HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import RandomNumberInnerTextChanger from '../13/RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import Variables from '../13/Variables.js'
import StartTimeChanger from '../13ba/StartTimeChanger.js'
import StartTimeInnerTextChanger from '../13ba/StartTimeInnerTextChanger.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
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
