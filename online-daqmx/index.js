import { Server } from 'http'
import HTTPPutHandler from './HTTPPutHandler.js'
import WaveformInitializer from './WaveformInitializer.js'
import WaveformSVGInnerHTMLMaker from './WaveformSVGInnerHTMLMaker.js'
import HTTPGetHandler from './HTTPGetHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import DAQmxInitializer from './DAQmxInitializer.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StartTimeChanger from './StartTimeChanger.js'
import StartTimeInnerTextChanger from './StartTimeInnerTextChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import Variables from './Variables.js'
import PeakFinder from './PeakFinder.js'

const variables = new Variables()

new WaveformInitializer(variables)
new WaveformSVGInnerHTMLMaker(variables)
new HTTPGetHandler(variables)
new HTTPPutHandler(variables)
new HTTPServerSetupper(variables)
new HTTPUpgradeHandler(variables)
new DAQmxInitializer(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new StartTimeChanger(variables)
new StartTimeInnerTextChanger(variables)
new PeakFinder(variables)

variables.httpServer.assign(new Server()) 
variables.daqmxDestinationState.assign('idle')
