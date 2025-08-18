import { Server } from 'http'
import { Socket } from 'net'
import HistogramInitializer from '../14/HistogramInitializer.js'
import HistogramMaker from '../14/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../14/HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../14/HTTPGetHandler.js'
import HTTPServerSetupper from '../14/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../14/HTTPUpgradeHandler.js'
import RandomNumberInnerTextChanger from '../14/RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from '../14/StartButtonDisabledChanger.js'
import StartTimeInnerTextChanger from '../14/StartTimeInnerTextChanger.js'
import StopButtonDisabledChanger from '../14/StopButtonDisabledChanger.js'
import TimeSeriesInitializer from '../14/TimeSeriesInitializer.js'
import TimeSeriesMaker from '../14/TimeSeriesMaker.js'
import TimeSeriesSVGInnerHTMLMaker from '../14/TimeSeriesSVGInnerHTMLMaker.js'
import RandomNumberGetter from './RandomNumberGetter.js'
import SocketDataHandler from './SocketDataHandler.js'
import Variables from './Variables.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HTTPGetHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new RandomNumberGetter(variables)
new RandomNumberInnerTextChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)
new TimeSeriesInitializer(variables)
new TimeSeriesMaker(variables)
new TimeSeriesSVGInnerHTMLMaker(variables)
new SocketDataHandler(variables)

variables.httpServer.assign(new Server()) 
variables.socket.assign(new Socket()) 
variables.randomNumberGeneratorIsBusy.assign(false)