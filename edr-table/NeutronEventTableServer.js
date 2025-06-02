import NeutronEventAccumulator from './NeutronEventAccumulator.js'
import NeutronEventMessageInnerTextMaker from './NeutronEventMessageInnerTextMaker.js'
import NeutronEventTableInnerHTMLMaker from './NeutronEventTableInnerHTMLMaker.js'
import EDRFileNamesFinder from './EDRFileNamesFinder.js'
import EDRReader from './EDRReader.js'
import EventBufferParser from './EventBufferParser.js'
import Variables from './Variables.js'
import PairedEventMaker from './PairedEventMaker.js'
import NeutronEventMaker from './NeutronEventMaker.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        this.variables = new Variables(webSocket)

        new EDRFileNamesFinder(this.variables)
        new EDRReader(this.variables)
        new EventBufferParser(this.variables)
        new PairedEventMaker(this.variables)
        new NeutronEventMaker(this.variables)
        new NeutronEventAccumulator(this.variables)
        new NeutronEventTableInnerHTMLMaker(this.variables)
        new NeutronEventMessageInnerTextMaker(this.variables)

        this.variables.edrPath.assign('../../edr/20230420')
        this.variables.neutronPositionBitLength.assign(10)
        this.variables.tofMaxInMilliseconds.assign(80)
        this.variables.tofDifferenceMaxInNanoseconds.assign(250)
        this.variables.tofDifferenceMinInNanoseconds.assign(-250)
    }
}

