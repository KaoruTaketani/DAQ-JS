import ContrastMaker from "./ContrastMaker.js"
import ContrastRatioMaker from "./ContrastRatioMaker.js"
import EDRReader from "./EDRReader.js"
import EnergyMaker from "./EnergyMaker.js"
import EventBufferParser from "./EventBufferParser.js"
import FilteredImageInitializer from "./FilteredImageInitializer.js"
import FilteredImageMaker from "./FilteredImageMaker.js"
import FilteredNeutronEventMaker from "./FilteredNeutronEventMaker.js"
import FilteredTOFHistogramInitializer from "./FilteredTOFHistogramInitializer.js"
import FilteredTOFHistogramMaker from "./FilteredTOFHistogramMaker.js"
import FilteredTOFImageInitializer from "./FilteredTOFImageInitializer.js"
import FilteredTOFImageMaker from "./FilteredTOFImageMaker.js"
import FourierEnergyMaker from "./FourierEnergyMaker.js"
import FourierTimeMaker from "./FourierTimeMaker.js"
import ImageInitializer from "./ImageInitializer.js"
import ImageMaker from "./ImageMaker.js"
import MomentumTransferMaker from "./MomentumTransferMaker.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import NeutronRateMaker from "./NeutronRateMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import PhaseMaker from "./PhaseMaker.js"
import PhaseShiftMaker from "./PhaseShiftMaker.js"
import ReflectivityMaker from "./ReflectivityMaker.js"
import TOFMaker from "./TOFMaker.js"
import Variables from "./Variables.js"
import VelocityMaker from "./VelocityMaker.js"
import WavelengthMaker from "./WavelengthMaker.js"
import JSONFileReader from "./JSONFileReader.js"

const variables = new Variables()

new EDRReader(variables)
new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new ImageInitializer(variables)
new ImageMaker(variables)
new FilteredNeutronEventMaker(variables)
new FilteredImageInitializer(variables)
new FilteredImageMaker(variables)
new FilteredTOFHistogramInitializer(variables)
new FilteredTOFHistogramMaker(variables)
new ContrastMaker(variables)
new PhaseMaker(variables)
new NeutronRateMaker(variables)
new FilteredTOFImageInitializer(variables)
new FilteredTOFImageMaker(variables)
new ContrastRatioMaker(variables)
new PhaseShiftMaker(variables)
new ReflectivityMaker(variables)
new TOFMaker(variables)
new VelocityMaker(variables)
new EnergyMaker(variables)
new WavelengthMaker(variables)
new FourierTimeMaker(variables)
new FourierEnergyMaker(variables)
new MomentumTransferMaker(variables)
new JSONFileReader(variables)

variables.hdf5Path.assign('../../hdf5/mieze')
variables.jsonFilePaths.assign([
    './104.json',
    './104_16.json',
    './104_32.json',
    './106.json',
    './106_16.json',
    './106_32.json',
    './113.json',
    './115.json'
])
// variables.jsonFilePaths.assign(['./104.json'])
// variables.jsonFilePaths.assign(['./106.json'])

