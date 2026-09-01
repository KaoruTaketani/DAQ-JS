import JSONFileReader from "./JSONFileReader.js"
import SIGBReader from "./SIGBReader.js"
import Variables from "./Variables.js"
import colon from '../lib/colon.js'
import BackgroundFitter from "./BackgroundFitter.js"

const variables = new Variables()

new SIGBReader(variables)
new BackgroundFitter(variables)
new JSONFileReader(variables)

// edit jsonPath.js to set jsonPath
variables.projectName.assign('20151203')
variables.hdf5Path.assign('../../hdf5/')
variables.sigbPath.assign('../../sigb/')
// variables.jsonFileNames.assign(['1.json'])
variables.jsonFileNames.assign(colon(1, 321).map(i => `${i}.json`))


