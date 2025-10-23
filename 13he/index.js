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
import HistogramSVGInnerHTMLMaker from '../13hb/HistogramSVGInnerHTMLMaker.js'
import RandomNumberGenerator from '../13hb/RandomNumberGenerator.js'
import RandomNumberInnerTextChanger from '../13hb/RandomNumberInnerTextChanger.js'
import BatchStartButtonDisabledChanger from '../13hb/BatchStartButtonDisabledChanger.js'
import BatchTableInnerHTMLMaker from '../13hb/BatchTableInnerHTMLMaker.js'
import BatchProcessor from '../13hc/BatchProcessor.js'
import BatchStopper from '../13hc/BatchStopper.js'
import BatchStopButtonDisabledChanger from '../13hc/BatchStopButtonDisabledChanger.js'
import Variables from './Variables.js'
import BatchParamsMaker from './BatchParamsMaker.js'
import PresetStartValueChanger from './PresetStartValueChanger.js'
import PresetStopValueChanger from './PresetStopValueChanger.js'
import PresetStepValueChanger from './PresetStepValueChanger.js'
import MeansInitializer from './MeansInitializer.js'
import MeansMaker from './MeansMaker.js'
import MeansSVGInnerHTMLMaker from './MeansSVGInnerHTMLMaker.js'

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
new MeansMaker(variables)
new BatchProcessor(variables)
new BatchStopper(variables)
new BatchParamsMaker(variables)
new PresetStartValueChanger(variables)
new PresetStopValueChanger(variables)
new PresetStepValueChanger(variables)
new MeansInitializer(variables)
new MeansSVGInnerHTMLMaker(variables)


variables.httpServer.assign(new Server())
variables.randomNumberGeneratorIsBusy.assign(false)
variables.preset.assign(50)
variables.batchProcessorIsBusy.assign(false)
variables.presetStart.assign(10)
variables.presetStop.assign(50)
variables.presetStep.assign(10)