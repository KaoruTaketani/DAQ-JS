import { join } from 'path'
import jsonBasePath from "../file-viewer/jsonBasePath.js"
import CameraPixelSizeCalculator from "./CameraPixelSizeCalculator.js"
import EDRReader from "./EDRReader.js"
import EnergyMaker from "./EnergyMaker.js"
import EventBufferParser from "./EventBufferParser.js"
import ImageInitializer from "./ImageInitializer.js"
import ImageMaker from "./ImageMaker.js"
import JSONFileReader from "./JSONFileReader.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import PulseHeightHistogramInitializer from "./PulseHeightHistogramInitializer.js"
import PulseHeightHistogramMaker from "./PulseHeightHistogramMaker.js"
import TOFDifferenceHistogramInitializer from "./TOFDifferenceHistogramInitializer.js"
import TOFDifferenceHistogramMaker from "./TOFDifferenceHistogramMaker.js"
import TOFHistogramInitializer from "./TOFHistogramInitializer.js"
import TOFHistogramMaker from "./TOFHistogramMaker.js"
import TOFMaker from "./TOFMaker.js"
import Variables from "./Variables.js"
import VelocityMaker from "./VelocityMaker.js"
import WavelengthMaker from "./WavelengthMaker.js"
import WavenumberMaker from "./WavenumberMaker.js"

const variables = new Variables()

new EDRReader(variables)
new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new ImageInitializer(variables)
new ImageMaker(variables)
new TOFHistogramInitializer(variables)
new TOFHistogramMaker(variables)
new TOFMaker(variables)
new VelocityMaker(variables)
new WavenumberMaker(variables)
new EnergyMaker(variables)
new WavelengthMaker(variables)
new PulseHeightHistogramInitializer(variables)
new PulseHeightHistogramMaker(variables)
new TOFDifferenceHistogramInitializer(variables)
new TOFDifferenceHistogramMaker(variables)
new CameraPixelSizeCalculator(variables)
new JSONFileReader(variables)

variables.jsonPath.assign(join(jsonBasePath(), '@BL06', '20250424'))
variables.hdf5Path.assign('../../hdf5/20250424')
variables.edrPath.assign('../../edr/20250424')
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
// json file without direct beam
// variables.jsonFileNames.assign(['0.json'])
// json file with direct beam
// variables.jsonFileNames.assign(['2.json'])
// json file with direct beam and low incident angle reflectivity
variables.jsonFileNames.assign(['4.json'])
// console.log(colon(0, 60))
// variables.jsonFileNames.assign(colon(0, 60).map(i => `${i}.json`))
// variables.jsonFilePaths.assign(['./106.json'])

