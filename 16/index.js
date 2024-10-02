import { Server } from 'http'
import HistogramInitializer from './HistogramInitializer.js'
import HistogramMaker from './HistogramMaker.js'
import HistogramMessageInnerTextChanger from './HistogramMessageInnerTextChanger.js'
import HistogramSVGInnerHTMLMaker from './HistogramSVGInnerHTMLMaker.js'
import HistogramSVGViewBoxInitializer from './HistogramSVGViewBoxInitializer.js'
import HistogramTotalCounter from './HistogramTotalCounter.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import RandomNumberStartDisabledChanger from './RandomNumberStartDisabledChanger.js'
import RandomNumberStopDisabledChanger from './RandomNumberStopDisabledChanger.js'
import Variables from './Variables.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramMessageInnerTextChanger(variables)
new HistogramTotalCounter(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HistogramSVGViewBoxInitializer(variables)
new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new RandomNumberStartDisabledChanger(variables)
new RandomNumberStopDisabledChanger(variables)

variables.httpServer.assign(new Server()) 
