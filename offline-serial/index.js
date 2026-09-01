import colon from "../lib/colon.js"
import TOFHistogramContrastMaker from "./TOFHistogramContrastMaker.js"
import TOFHistogramContrastRatioMaker from "./TOFHistogramContrastRatioMaker.js"
import EDRReader from "./EDRReader.js"
import EnergyMaker from "./EnergyMaker.js"
import EventBufferParser from "./EventBufferParser.js"
import FilteredImageInitializer from "./FilteredImageInitializer.js"
import FilteredImageMaker from "./FilteredImageMaker.js"
import FilteredNeutronEventMaker from "./FilteredNeutronEventMaker.js"
import FitFinder from "./FitFinder.js"
import FourierEnergyMaker from "./FourierEnergyMaker.js"
import FourierTimeMaker from "./FourierTimeMaker.js"
import TOFImageVProjectionInitializer from "./TOFImageVProjectionInitializer.js"
import TOFImageVProjectionMaker from "./TOFImageVProjectionMaker.js"
import ImageVProjectionInitializer from "./ImageVProjectionInitializer.js"
import ImageVProjectionMaker from "./ImageVProjectionMaker.js"
import TOFImageVProjectionMeansMaker from "./TOFImageVProjectionMeansMaker.js"
import TOFImageVProjectionStandardDeviationsMaker from "./TOFImageVProjectionStandardDeviationsMaker.js"
import CameraPixelSizeCalculator from "./CameraPixelSizeCalculator.js"
import JSONFileReader from "./JSONFileReader.js"
import MomentumTransferMaker from "./MomentumTransferMaker.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import NeutronPerPulseMaker from "./NeutronPerPulseMaker.js"
import NeutronRateMaker from "./NeutronRateMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import TOFHistogramPhaseMaker from "./TOFHistogramPhaseMaker.js"
import TOFHistogramPhaseShiftMaker from "./TOFHistogramPhaseShiftMaker.js"
import PulseHeightHistogramInitializer from "./PulseHeightHistogramInitializer.js"
import PulseHeightHistogramMaker from "./PulseHeightHistogramMaker.js"
import RawImageInitializer from "./RawImageInitializer.js"
import RawImageMaker from "./RawImageMaker.js"
import ReflectivityMaker from "./ReflectivityMaker.js"
import ROIInPixelsMaker from "./ROIInPixelsMaker.js"
import TOFDifferenceHistogramInitializer from "./TOFDifferenceHistogramInitializer.js"
import TOFDifferenceHistogramMaker from "./TOFDifferenceHistogramMaker.js"
import TOFHistogramInitializer from "./TOFHistogramInitializer.js"
import TOFHistogramMaker from "./TOFHistogramMaker.js"
import TOFImageInitializer from "./TOFImageInitializer.js"
import TOFImageMaker from "./TOFImageMaker.js"
import TOFMaker from "./TOFMaker.js"
import Variables from "./Variables.js"
import VelocityMaker from "./VelocityMaker.js"
import ImageHProjectionInitializer from "./ImageHProjectionInitializer.js"
import ImageHProjectionMaker from "./ImageHProjectionMaker.js"
import WavelengthMaker from "./WavelengthMaker.js"
import WavenumberMaker from "./WavenumberMaker.js"
import TOFHistogramSumMaker from "./TOFHistogramSumMaker.js"
import TOFImageVProjectionSumsMaker from "./TOFImageVProjectionSumsMaker.js"

const variables = new Variables()

new EDRReader(variables)
new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new RawImageInitializer(variables)
new RawImageMaker(variables)
new ImageHProjectionInitializer(variables)
new ImageHProjectionMaker(variables)
new ImageVProjectionInitializer(variables)
new ImageVProjectionMaker(variables)
new FilteredNeutronEventMaker(variables)
new FilteredImageInitializer(variables)
new FilteredImageMaker(variables)
new TOFHistogramInitializer(variables)
new TOFHistogramMaker(variables)
new TOFHistogramContrastMaker(variables)
new TOFHistogramPhaseMaker(variables)
new TOFHistogramSumMaker(variables)
new NeutronRateMaker(variables)
// new NeutronPerPulseMaker(variables)
// new TOFImageInitializer(variables)
// new TOFImageMaker(variables)
new TOFImageVProjectionInitializer(variables)
new TOFImageVProjectionMaker(variables)
new TOFImageVProjectionSumsMaker(variables)
new TOFImageVProjectionMeansMaker(variables)
new TOFImageVProjectionStandardDeviationsMaker(variables)
new FitFinder(variables)
new TOFHistogramContrastRatioMaker(variables)
new TOFHistogramPhaseShiftMaker(variables)
new ReflectivityMaker(variables)
new TOFMaker(variables)
new VelocityMaker(variables)
new WavenumberMaker(variables)
new EnergyMaker(variables)
new WavelengthMaker(variables)
new FourierTimeMaker(variables)
new FourierEnergyMaker(variables)
new MomentumTransferMaker(variables)
new PulseHeightHistogramInitializer(variables)
new PulseHeightHistogramMaker(variables)
new TOFDifferenceHistogramInitializer(variables)
new TOFDifferenceHistogramMaker(variables)
new CameraPixelSizeCalculator(variables)
new ROIInPixelsMaker(variables)
new JSONFileReader(variables)

// edit jsonPath.js to set jsonPath
variables.projectName.assign('20250424')
variables.hdf5Path.assign('../../hdf5/')
variables.edrPath.assign('../../edr/')
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
// variables.jsonFileNames.assign(['51.json','52.json','53.json','54.json','55.json','56.json','57.json','58.json','59.json','60.json'])
// variables.jsonFileNames.assign(['104.json'])
variables.jsonFileNames.assign(['0.json'])
// console.log(colon(0, 60))
// variables.jsonFileNames.assign(colon(0, 60).map(i => `${i}.json`))
// variables.jsonFilePaths.assign(['./106.json'])

