import colon from "../lib/colon.js"
import EDRReader from "./EDRReader.js"
import EventBufferParser from "./EventBufferParser.js"
import JSONFileReader from "./JSONFileReader.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import NeutronPerPulseInitializer from "./NeutronPerPulseInitializer.js"
import NeutronPerPulseMaker from "./NeutronPerPulseMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import Variables from "./Variables.js"

const variables = new Variables()

new EDRReader(variables)
new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new NeutronPerPulseInitializer(variables)
new NeutronPerPulseMaker(variables)
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
// json file without direct beam
// variables.jsonFileNames.assign(['0.json'])
// json file with direct beam
// variables.jsonFileNames.assign(['2.json'])
// json file with direct beam and low incident angle reflectivity
variables.jsonFileNames.assign(['2q.json'])
// console.log(colon(0, 60))
// variables.jsonFileNames.assign(colon(0, 60).map(i => `${i}.json`))
// variables.jsonFilePaths.assign(['./106.json'])

