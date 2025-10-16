import { Server } from 'http'
import HistogramInitializer from '../13/HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import Comparator from '../13ha/Comparator.js'
import PresetDisabledChanger from '../13ha/PresetDisabledChanger.js'
import PresetValueChanger from '../13ha/PresetValueChanger.js'
import RandomNumberGenerator from './RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from './RandomNumberInnerTextChanger.js'
import HistogramSVGInnerHTMLMaker from './HistogramSVGInnerHTMLMaker.js'
import Variables from './Variables.js'
import BatchTableInnerHTMLMaker from './BatchTableInnerHTMLMaker.js'
import BatchProcessor from './BatchProcessor.js'
import BatchStartButtonDisabledChanger from './BatchStartButtonDisabledChanger.js'

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
new BatchStartButtonDisabledChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new PresetValueChanger(variables)
new PresetDisabledChanger(variables)
new Comparator(variables)
new BatchTableInnerHTMLMaker(variables)
new BatchProcessor(variables)

variables.httpServer.assign(new Server())
variables.randomNumberGeneratorIsBusy.assign(false)
variables.preset.assign(50)
variables.batchParams.assign([
    'preset=10',
    'randomNumberGeneratorIsBusy=true',
    'preset=20',
    'randomNumberGeneratorIsBusy=true',
    'preset=30',
    'randomNumberGeneratorIsBusy=true',
    'preset=40',
    'randomNumberGeneratorIsBusy=true',
    'preset=50',
    'randomNumberGeneratorIsBusy=true'
])
