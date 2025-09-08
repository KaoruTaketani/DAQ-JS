import { Server } from 'http'
import HistogramInitializer from './HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../13/HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import RandomNumberGenerator from '../13/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../13/RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import StartTimeInnerTextChanger from '../13/StartTimeInnerTextChanger.js'
import Variables from './Variables.js'
import HDF5LinkHrefMaker from './HDF5LinkHrefMaker.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HTTPGetHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberInnerTextChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)
new HDF5LinkHrefMaker(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)
variables.histogramBinLimitsMin.assign(0)
variables.histogramBinLimitsMax.assign(1)