import ChannelEventAccumulator from './ChannelEventAccumulator.js'
import ChannelEventMessageInnerTextMaker from './ChannelEventMessageInnerTextMaker.js'
import ChannelEventTableInnerHTMLMaker from './ChannelEventTableInnerHTMLMaker.js'
import EDRFileNamesFinder from './EDRFileNamesFinder.js'
import EDRReader from './EDRReader.js'
import EventBufferParser from './EventBufferParser.js'
import Variables from './Variables.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        this.variables = new Variables(webSocket)

        new EDRFileNamesFinder(this.variables)
        new EDRReader(this.variables)
        new EventBufferParser(this.variables)
        new ChannelEventAccumulator(this.variables)
        new ChannelEventTableInnerHTMLMaker(this.variables)
        new ChannelEventMessageInnerTextMaker(this.variables)

        this.variables.edrPath.assign('../../edr/20230420')
        this.variables.neutronPositionBitLength.assign(10)
        this.variables.pulseRepetitionFrequencyInHertz.assign(25 / 2)
    }
}

