import PairedEventAccumulator from './PairedEventAccumulator.js'
import PairedEventMessageInnerTextMaker from './PairedEventMessageInnerTextMaker.js'
import PairedEventTableInnerHTMLMaker from './PairedEventTableInnerHTMLMaker.js'
import EDRFileNamesFinder from './EDRFileNamesFinder.js'
import EDRReader from './EDRReader.js'
import EventBufferParser from './EventBufferParser.js'
import Variables from './Variables.js'
import PairedEventMaker from './PairedEventMaker.js'

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
        new PairedEventAccumulator(this.variables)
        new PairedEventTableInnerHTMLMaker(this.variables)
        new PairedEventMessageInnerTextMaker(this.variables)

        this.variables.edrPath.assign('../../edr/20230420')
        this.variables.neutronPositionBitLength.assign(10)
    }
}

