import { Server } from 'http'
import HistogramInitializer from './HistogramInitializer.js'
import HistogramMaker from '../14/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../14/HistogramSVGInnerHTMLMaker.js'
import HTTPServerRequestHandler from '../14/HTTPServerRequestHandler.js'
import HTTPServerSetupper from '../14/HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from '../14/HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from '../14/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../14/RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from '../14/StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from '../14/StopButtonDisabledChanger.js'
import StartTimeInnerTextChanger from '../14/StartTimeInnerTextChanger.js'
import TimeSeriesInitializer from '../14/TimeSeriesInitializer.js'
import TimeSeriesMaker from '../14/TimeSeriesMaker.js'
import TimeSeriesSVGInnerHTMLMaker from '../14/TimeSeriesSVGInnerHTMLMaker.js'
import Variables from './Variables.js'
import HDF5LinkHrefMaker from './HDF5LinkHrefMaker.js'

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
new HDF5LinkHrefMaker(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)
variables.histogramBinLimitsMin.assign(0)
variables.histogramBinLimitsMax.assign(1)