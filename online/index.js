import { Server } from 'http'
import Channel0CountInnerTextMaker from './Channel0CountInnerTextMaker.js'
import Channel1CountInnerTextMaker from './Channel1CountInnerTextMaker.js'
import EDRFilePathFinder from './EDRFilePathFinder.js'
import EDRFilePathInnerTextMaker from './EDRFilePathInnerTextMaker.js'
import EDRFileWriter from './EDRFileWriter.js'
import EventBufferParser from './EventBufferParser.js'
import HTTPServerRequestHandler from './HTTPServerRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPServerUpgradeHandler from './HTTPServerUpgradeHandler.js'
import ImageMaker from './ImageMaker.js'
import ImageSrcMaker from './ImageSrcMaker.js'
import KickerPulseCountInnerTextMaker from './KickerPulseCountInnerTextMaker.js'
import NEUNETReaderComparator from './NEUNETReaderComparator.js'
import NEUNETReaderInitializer from './NEUNETReaderInitializer.js'
import NEUNETReaderStarter from './NEUNETReaderStarter.js'
import NEUNETReaderStopper from './NEUNETReaderStopper.js'
import NeutronCountInnerTextMaker from './NeutronCountInnerTextMaker.js'
import NeutronEventMaker from './NeutronEventMaker.js'
import PairedEventMaker from './PairedEventMaker.js'
import PresetDisabledChanger from './PresetDisabledChanger.js'
import PresetValueChanger from './PresetValueChanger.js'
import SaveFileCheckedChanger from './SaveFileCheckedChanger.js'
import SaveFileDisabledChanger from './SaveFileDisabledChanger.js'
import StartButtonDisabledChanger from './StartButtonDisabledChanger.js'
import StopButtonDisabledChanger from './StopButtonDisabledChanger.js'
import UsePresetCheckedChanger from './UsePresetCheckedChanger.js'
import UsePresetDisabledChanger from './UsePresetDisabledChanger.js'
import Variables from './Variables.js'

const variables = new Variables()

new HTTPServerRequestHandler(variables)
new HTTPServerSetupper(variables)
new HTTPServerUpgradeHandler(variables)
new NEUNETReaderInitializer(variables)
// new NEUNETReaderDataHandler(variables)
new NEUNETReaderStarter(variables)
new NEUNETReaderComparator(variables)
new NEUNETReaderStopper(variables)
new EventBufferParser(variables)
new KickerPulseCountInnerTextMaker(variables)
new Channel0CountInnerTextMaker(variables)
new Channel1CountInnerTextMaker(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new NeutronCountInnerTextMaker(variables)
new ImageMaker(variables)
new ImageSrcMaker(variables)
new StartButtonDisabledChanger(variables)
new StopButtonDisabledChanger(variables)
new UsePresetDisabledChanger(variables)
new UsePresetCheckedChanger(variables)
new PresetDisabledChanger(variables)
new PresetValueChanger(variables)
new SaveFileDisabledChanger(variables)
new SaveFileCheckedChanger(variables)
new EDRFilePathFinder(variables)
new EDRFilePathInnerTextMaker(variables)
new EDRFileWriter(variables)

variables.httpServer.assign(new Server()) 
