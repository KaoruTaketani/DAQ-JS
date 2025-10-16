import { Server } from 'http'
import HistogramInitializer from '../13/HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HistogramSVGInnerHTMLMaker from './HistogramSVGInnerHTMLMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StartTimeInnerTextChanger from '../13/StartTimeInnerTextChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import Comparator from '../13ha/Comparator.js'
import PresetDisabledChanger from '../13ha/PresetDisabledChanger.js'
import PresetValueChanger from '../13ha/PresetValueChanger.js'
import Variables from './Variables.js'

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
new StartTimeInnerTextChanger(variables)
new PresetValueChanger(variables)
new PresetDisabledChanger(variables)
new Comparator(variables)

variables.httpServer.assign(new Server()) 
variables.randomNumberGeneratorIsBusy.assign(false)
variables.preset.assign(50)
