import { Server } from 'http'
import HistogramInitializer from './HistogramInitializer.js'
import HistogramMaker from './HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from './HistogramSVGInnerHTMLMaker.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StartTimeInnerTextChanger from './StartTimeInnerTextChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import TimeSeriesInitializer from './TimeSeriesInitializer.js'
import TimeSeriesMaker from './TimeSeriesMaker.js'
import TimeSeriesSVGInnerHTMLMaker from './TimeSeriesSVGInnerHTMLMaker.js'
import Variables from './Variables.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)
new TimeSeriesInitializer(variables)
new TimeSeriesMaker(variables)
new TimeSeriesSVGInnerHTMLMaker(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)