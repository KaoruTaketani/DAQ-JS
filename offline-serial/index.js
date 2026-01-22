import ContrastMaker from "./ContrastMaker.js"
import ContrastRatioMaker from "./ContrastRatioMaker.js"
import EDRReader from "./EDRReader.js"
import EnergyMaker from "./EnergyMaker.js"
import EventBufferParser from "./EventBufferParser.js"
import FilteredImageInitializer from "./FilteredImageInitializer.js"
import FilteredImageMaker from "./FilteredImageMaker.js"
import FilteredNeutronEventMaker from "./FilteredNeutronEventMaker.js"
import FourierEnergyMaker from "./FourierEnergyMaker.js"
import FourierTimeMaker from "./FourierTimeMaker.js"
import ImageInitializer from "./ImageInitializer.js"
import ImageMaker from "./ImageMaker.js"
import JSONFileReader from "./JSONFileReader.js"
import MomentumTransferMaker from "./MomentumTransferMaker.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import NeutronPerPulseMaker from "./NeutronPerPulseMaker.js"
import NeutronRateMaker from "./NeutronRateMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import PhaseMaker from "./PhaseMaker.js"
import PhaseShiftMaker from "./PhaseShiftMaker.js"
import PulseHeightHistogramInitializer from "./PulseHeightHistogramInitializer.js"
import PulseHeightHistogramMaker from "./PulseHeightHistogramMaker.js"
import ReflectivityMaker from "./ReflectivityMaker.js"
import TOFDifferenceHistogramInitializer from "./TOFDifferenceHistogramInitializer.js"
import TOFDifferenceHistogramMaker from "./TOFDifferenceHistogramMaker.js"
import TOFHistogramInitializer from "./TOFHistogramInitializer.js"
import TOFHistogramMaker from "./TOFHistogramMaker.js"
import TOFMaker from "./TOFMaker.js"
import Variables from "./Variables.js"
import VelocityMaker from "./VelocityMaker.js"
import VerticalProjectionInitializer from "./VerticalProjectionInitializer.js"
import VerticalProjectionMaker from "./VerticalProjectionMaker.js"
import WavelengthMaker from "./WavelengthMaker.js"

const variables = new Variables()

new EDRReader(variables)
new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new ImageInitializer(variables)
new ImageMaker(variables)
new VerticalProjectionInitializer(variables)
new VerticalProjectionMaker(variables)
new FilteredNeutronEventMaker(variables)
new FilteredImageInitializer(variables)
new FilteredImageMaker(variables)
new TOFHistogramInitializer(variables)
new TOFHistogramMaker(variables)
new ContrastMaker(variables)
new PhaseMaker(variables)
new NeutronRateMaker(variables)
// new TOFImageInitializer(variables)
// new TOFImageMaker(variables)
// new HorizontalProjectionHistogramsInitializer(variables)
// new HorizontalProjectionHistogramsMaker(variables)
// new FitFinder(variables)
// new HorizontalProjectionMeansMaker(variables)
// new HorizontalProjectionStandardDeviationsMaker(variables)
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
new NeutronPerPulseMaker(variables)
new PulseHeightHistogramInitializer(variables)
new PulseHeightHistogramMaker(variables)
new TOFDifferenceHistogramInitializer(variables)
new TOFDifferenceHistogramMaker(variables)
new JSONFileReader(variables)

variables.hdf5Path.assign('../../hdf5/mieze')
// variables.jsonFilePaths.assign([
//     './104.json',
//     './104_16.json',
//     './104_32.json',
//     './106.json',
//     './106_16.json',
//     './106_32.json',
//     './113.json',
//     './115.json'
// ])
// variables.jsonFilePaths.assign([
//     './40.json',
//     './41.json',
//     './42.json',
//     './43.json'
// ])
variables.jsonFilePaths.assign(['./2a.json'])
// variables.jsonFilePaths.assign(['./106.json'])

