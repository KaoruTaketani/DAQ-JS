import { Server } from 'http'
import AttributesInnerHTMLMaker from './AttributesInnerHTMLMaker.js'
import ClientInnerHTMLSender from './ClientInnerHTMLSender.js'
import HTTPRequestHandler from './HTTPRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import ImageInnerHTMLMaker from './ImageInnerHTMLMaker.js'
import NeutronRateInnerHTMLMaker from './NeutronRateInnerHTMLMaker.js'
import TableInnerHTMLMaker from './TableInnerHTMLMaker.js'
import Variables from './Variables.js'
import TableMetadataReader from './TableMetadataReader.js'
import ContrastInnerHTMLMaker from './ContrastInnerHTMLMaker.js'

const variables = new Variables()
new HTTPRequestHandler(variables)
new HTTPUpgradeHandler(variables)
new HTTPServerSetupper(variables)
new TableMetadataReader(variables)
new ClientInnerHTMLSender(variables)
new AttributesInnerHTMLMaker(variables)
new ContrastInnerHTMLMaker(variables)
new ImageInnerHTMLMaker(variables)
new NeutronRateInnerHTMLMaker(variables)
new TableInnerHTMLMaker(variables)

variables.hdf5Path.assign('../../hdf5/mieze')
variables.httpServer.assign(new Server())


