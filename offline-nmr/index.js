import JSONFileReader from "./JSONFileReader.js"
import SIGBReader from "./SIGBReader.js"
import Variables from "./Variables.js"
import colon from '../lib/colon.js'
import BackgroundFitter from "./BackgroundFitter.js"
import jsonBasePath from "./jsonBasePath.js"
import { join } from 'path'

const variables = new Variables()

new SIGBReader(variables)
new BackgroundFitter(variables)
new JSONFileReader(variables)

variables.jsonPath.assign(join(jsonBasePath(), '20151203'))
variables.hdf5Path.assign('../../hdf5/20151203')
variables.sigbPath.assign('../../sigb/20151203')
// variables.jsonFileNames.assign(['1.json'])
variables.jsonFileNames.assign(colon(1, 321).map(i => `${i}.json`))


