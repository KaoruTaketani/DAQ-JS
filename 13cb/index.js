import { Server } from 'http'
import HistogramInitializer from '../13/HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../13/HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import RandomNumberGenerator from '../13/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../13/RandomNumberInnerTextChanger.js'
import ReadButtonDisabledChanger from './ReadButtonDisabledChanger.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StartTimeInnerTextChanger from '../13/StartTimeInnerTextChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import TimeSeriesInitializer from '../13c/TimeSeriesInitializer.js'
import TimeSeriesMaker from '../13c/TimeSeriesMaker.js'
import TimeSeriesSVGInnerHTMLMaker from '../13c/TimeSeriesSVGInnerHTMLMaker.js'
import InfluxWriter from './InfluxWriter.js'
import InfluxReader from './InfluxReader.js'
import Variables from './Variables.js'

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
new ReadButtonDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)
new TimeSeriesInitializer(variables)
new TimeSeriesMaker(variables)
new TimeSeriesSVGInnerHTMLMaker(variables)
new InfluxWriter(variables)
new InfluxReader(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)
variables.readButtonDisabled.assign(true)