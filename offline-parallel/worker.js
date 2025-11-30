import EventBufferParser from "./EventBufferParser.js"
import FilteredImageInitializer from "./FilteredImageInitializer.js"
import FilteredImageMaker from "./FilteredImageMaker.js"
import FilteredNeutronEventMaker from "./FilteredNeutronEventMaker.js"
import JSONFileReader from "./JSONFileReader.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import PulseHeightHistogramInitializer from "./PulseHeightHistogramInitializer.js"
import PulseHeightHistogramMaker from "./PulseHeightHistogramMaker.js"
import RawImageInitializer from "./RawImageInitializer.js"
import RawImageMaker from "./RawImageMaker.js"
import TOFDifferenceHistogramInitializer from "./TOFDifferenceHistogramInitializer.js"
import TOFDifferenceHistogramMaker from "./TOFDifferenceHistogramMaker.js"
import TOFHistogramInitializer from "./TOFHistogramInitializer.js"
import TOFHistogramMaker from "./TOFHistogramMaker.js"
import WorkerVariables from "./WorkerVariables.js"
import VerticalProjectionInitializer from "./VerticalProjectionInitializer.js"
import VerticalProjectionMaker from "./VerticalProjectionMaker.js"
import { MessagePort, parentPort } from 'worker_threads'
import { ok } from 'assert'
import { isTypedArray } from "util/types"

const variables = new WorkerVariables()

new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
// new RawImageInitializer(variables)
new RawImageMaker(variables)
// new VerticalProjectionInitializer(variables)
// new VerticalProjectionMaker(variables)
// new FilteredNeutronEventMaker(variables)
// new FilteredImageInitializer(variables)
// new FilteredImageMaker(variables)
// new TOFHistogramInitializer(variables)
new TOFHistogramMaker(variables)
// new TOFImageInitializer(variables)
// new TOFImageMaker(variables)
// new HorizontalProjectionHistogramsInitializer(variables)
// new HorizontalProjectionHistogramsMaker(variables)
// new PulseHeightHistogramInitializer(variables)
// new PulseHeightHistogramMaker(variables)
// new TOFDifferenceHistogramInitializer(variables)
// new TOFDifferenceHistogramMaker(variables)
// new JSONFileReader(variables)

ok(parentPort)
parentPort.on('message', message => {
    // console.log(`${isTypedArray(message)} ${message instanceof Uint8Array} ${message instanceof Buffer}`)
    variables.message.assign(message)

    if (message instanceof Uint8Array) {
        // console.log(`Buffer.length: ${message.length}`)
        if (message.length > 0) {
            variables.eventBuffer.assign(message)
        }
    }
})