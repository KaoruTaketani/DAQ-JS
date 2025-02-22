import { Server } from 'http'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import NEUNETReaderComparator from './NEUNETReaderComparator.js'
import NEUNETReaderDataHandler from './NEUNETReaderDataHandler.js'
import NEUNETReaderInitializer from './NEUNETReaderInitializer.js'
import NEUNETReaderStarter from './NEUNETReaderStarter.js'
import PresetDisabledChanger from './PresetDisabledChanger.js'
import PresetValueChanger from './PresetValueChanger.js'
import SaveFileCheckedChanger from './SaveFileCheckedChanger.js'
import SaveFileDisabledChanger from './SaveFileDisabledChanger.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import TOFHistogramInitializer from './TOFHistogramInitializer.js'
import TOFHistogramMaker from './TOFHistogramMaker.js'
import TOFHistogramSVGInnerHTMLMaker from './TOFHistogramSVGInnerHTMLMaker.js'
import UsePresetCheckedChanger from './UsePresetCheckedChanger.js'
import UsePresetDisabledChanger from './UsePresetDisabledChanger.js'
import Variables from './Variables.js'
import KickerPulseCountInnerTextMaker from './KickerPulseCountInnerTextMaker.js'

const variables = new Variables()

new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new NEUNETReaderInitializer(variables)
new NEUNETReaderDataHandler(variables)
new NEUNETReaderStarter(variables)
new NEUNETReaderComparator(variables)
new KickerPulseCountInnerTextMaker(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new UsePresetDisabledChanger(variables)
new UsePresetCheckedChanger(variables)
new PresetDisabledChanger(variables)
new PresetValueChanger(variables)
new SaveFileDisabledChanger(variables)
new SaveFileCheckedChanger(variables)
new TOFHistogramInitializer(variables)
new TOFHistogramMaker(variables)
new TOFHistogramSVGInnerHTMLMaker(variables)

variables.httpServer.assign(new Server()) 
