import { Server } from 'http'
import HistogramInitializer from '../13/HistogramInitializer.js'
import HistogramMaker from '../13/HistogramMaker.js'
import HTTPGetHandler from '../13/HTTPGetHandler.js'
import HTTPPutHandler from '../13/HTTPPutHandler.js'
import HTTPServerSetupper from '../13/HTTPServerSetupper.js'
import HTTPUpgradeHandler from '../13/HTTPUpgradeHandler.js'
import StartButtonDisabledChanger from '../13/StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from '../13/StopButtonDisabledChanger.js'
import Comparator from '../13ga/Comparator.js'
import PresetDisabledChanger from '../13ga/PresetDisabledChanger.js'
import PresetValueChanger from '../13ga/PresetValueChanger.js'
import HistogramSVGInnerHTMLMaker from '../13gb/HistogramSVGInnerHTMLMaker.js'
import RandomNumberGenerator from '../13gb/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../13gb/RandomNumberInnerTextChanger.js'
import BatchProcessor from '../13gd/BatchProcessor.js'
import BatchStartButtonDisabledChanger from '../13ge/BatchStartButtonDisabledChanger.js'
import BatchStopButtonDisabledChanger from '../13ge/BatchStopButtonDisabledChanger.js'
import BatchTableInnerHTMLMaker from '../13ge/BatchTableInnerHTMLMaker.js'
import BatchEditButtonDisabledChanger from './BatchEditButtonDisabledChanger.js'
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
new BatchEditButtonDisabledChanger(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new PresetValueChanger(variables)
new PresetDisabledChanger(variables)
new Comparator(variables)
new BatchTableInnerHTMLMaker(variables)
new BatchProcessor(variables)
new TextAreaValueChanger(variables)

variables.httpServer.assign(new Server())
variables.histogramBinLimits.assign([0, 1])
variables.randomNumberGeneratorDestinationState.assign('idle')
variables.preset.assign(50)
variables.batchProcessorState.assign('idle')
variables.batchLimits.assign(new Map())
// limits must be assigned after batchLiimts is assigned
variables.randomNumberGeneratorDestinationStateLimits.assign(['busy'])
variables.presetLimits.assign([0, 35])
variables.batchParams.assign(new URLSearchParams([
    ['preset', '10'],
    ['randomNumberGeneratorDestinationState', 'busy'],
    ['preset', '20'],
    ['radomNumberGeneratorDestinationState', 'busy'],
    ['preset', '30'],
    ['randomNumberGeneratorDestinationState', 'buy'],
    ['preset', '40'],
    ['randomNumberGeneratorDestinationState', 'busy'],
    ['preset', '50'],
    ['randomNumberGeneratorDestinationState', 'busy']
]))

