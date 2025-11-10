import { Server } from 'http'
import HistogramInitializer from '../13/HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import Comparator from '../13ga/Comparator.js'
import PresetDisabledChanger from '../13ga/PresetDisabledChanger.js'
import PresetValueChanger from '../13ga/PresetValueChanger.js'
import BatchStartButtonDisabledChanger from '../13gc/BatchStartButtonDisabledChanger.js'
import BatchTableInnerHTMLMaker from '../13gc/BatchTableInnerHTMLMaker.js'
import HistogramSVGInnerHTMLMaker from '../13gc/HistogramSVGInnerHTMLMaker.js'
import RandomNumberGenerator from '../13gc/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../13gc/RandomNumberInnerTextChanger.js'
import BatchProcessor from '../13gd/BatchProcessor.js'
import BatchStopButtonDisabledChanger from '../13gd/BatchStopButtonDisabledChanger.js'
import HTTPPutHandler from './HTTPPutHandler.js'
import TextAreaValueChanger from './TextAreaValueChanger.js'
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
new BatchStartButtonDisabledChanger(variables)
new BatchStopButtonDisabledChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new PresetValueChanger(variables)
new PresetDisabledChanger(variables)
new Comparator(variables)
new BatchTableInnerHTMLMaker(variables)
new BatchProcessor(variables)
new TextAreaValueChanger(variables)

variables.httpServer.assign(new Server())
variables.randomNumberGeneratorIsBusy.assign(false)
variables.preset.assign(50)
variables.batchProcessorIsBusy.assign(false)
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
