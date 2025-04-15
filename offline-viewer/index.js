import { Server } from 'http'
import AttrsInnerHTMLMaker from './AttributesInnerHTMLMaker.js'
import AttrTableInnerHTMLMaker from './AttrTableInnerHTMLMaker.js'
import ClientInnerHTMLSender from './ClientInnerHTMLSender.js'
import HTTPRequestHandler from './HTTPRequestHandler.js'
import HTTPServerSetupper from './HTTPServerSetupper.js'
import HTTPUpgradeHandler from './HTTPUpgradeHandler.js'
import NeutronRateInnerHTMLMaker from './NeutronRateInnerHTMLMaker.js'
import Variables from './Variables.js'
import ImageInnerHTMLMaker from './ImageInnerHTMLMaker.js'

const variables = new Variables()
new HTTPRequestHandler(variables)
new HTTPUpgradeHandler(variables)
new HTTPServerSetupper(variables)
new AttrTableInnerHTMLMaker(variables)
new ClientInnerHTMLSender(variables)
new AttrsInnerHTMLMaker(variables)
new ImageInnerHTMLMaker(variables)
new NeutronRateInnerHTMLMaker(variables)
variables.hdf5Path.assign('../../hdf5/mieze')
variables.httpServer.assign(new Server())


