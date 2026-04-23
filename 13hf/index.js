import { Server } from 'http'
import HistogramMaker from '../13/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../13/HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import RandomNumberInnerTextChanger from '../13/RandomNumberInnerTextChanger.js'
import StartTimeInnerTextChanger from '../13/StartTimeInnerTextChanger.js'
import HistogramInitializer from './HistogramInitializer.js'
import RandomNumberGetter from './RandomNumberGetter.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import Variables from './Variables.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new RandomNumberGetter(variables)
new RandomNumberInnerTextChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGetterIsBusy.assign(false)