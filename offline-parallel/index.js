import EDRReader from "./EDRReader.js"
import TOFHistogramInitializer from "./TOFHistogramInitializer.js"
import Variables from "./Variables.js"
import WorkerMaker from "./WorkerMaker.js"

const variables = new Variables()

new EDRReader(variables)
new TOFHistogramInitializer(variables)
new WorkerMaker(variables)

// variables.hdf5Path.assign('../../hdf5/mieze')
// variables.jsonFilePaths.assign(['./2a.json'])


