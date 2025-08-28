import { Server } from 'http'
import HistogramInitializer from '../14/HistogramInitializer.js'
import HistogramMaker from '../14/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from '../14n/HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../14/HTTPGetHandler.js'
import HTTPServerSetupper from '../14/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../14/HTTPUpgradeHandler.js'
import RandomNumberGenerator from '../14n/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../14n/RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from '../14/StartButtonDisabledChanger.js'
import StartTimeInnerTextChanger from '../14/StartTimeInnerTextChanger.js'
import StopButtonDisabledChanger from '../14/StopButtonDisabledChanger.js'
import Comparator from '../14m/Comparator.js'
import PresetDisabledChanger from '../14m/PresetDisabledChanger.js'
import PresetValueChanger from '../14m/PresetValueChanger.js'
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
new StartTimeInnerTextChanger(variables)
new PresetValueChanger(variables)
new PresetDisabledChanger(variables)
new Comparator(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)
variables.preset.assign(500)
