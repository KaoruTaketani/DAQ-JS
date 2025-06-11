import { Server } from 'http'
import HistogramMakerInitializer from './HistogramMakerInitializer.js'
import RandomNumberGeneratorInitializer from './RandomNumberGeneratorInitializer.js'
import HistogramInitializer from './HistogramInitializer.js'
import HistogramMaker from './HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from './HistogramSVGInnerHTMLMaker.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import StartTimeInnerTextChanger from './StartTimeInnerTextChanger.js'
import TotalCounter from './TotalCounter.js'
import TotalInnerTextChanger from './TotalInnerTextChanger.js'
import Variables from './Variables.js'

const variables = new Variables()

new HistogramInitializer(variables)
new HistogramMaker(variables)
new HistogramMakerInitializer(variables)
new TotalInnerTextChanger(variables)
new TotalCounter(variables)
new HistogramSVGInnerHTMLMaker(variables)
new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new RandomNumberGenerator(variables)
new RandomNumberGeneratorInitializer(variables)
new RandomNumberInnerTextChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeInnerTextChanger(variables)

variables.httpServer.assign(new Server()) 
