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

/** @type {import('../lib/index.js').Histogram} */
let _tofHistogram
variables.tofHistogram.prependListener(arg => { _tofHistogram = arg })
/** @type {import('worker_threads').MessagePort} */
let _tofHistogramPort
variables.tofHistogramPort.prependListener(arg => { _tofHistogramPort = arg })
/** @type {import('../lib/index.js').Histogram} */
let _rawImage
variables.rawImage.prependListener(arg => { _rawImage = arg })
/** @type {import('worker_threads').MessagePort} */
let _rawImagePort
variables.rawImagePort.prependListener(arg => { _rawImagePort = arg })

ok(parentPort)
parentPort.on('message', message => {
    // console.log(`${isTypedArray(message)} ${message instanceof Uint8Array} ${message instanceof Buffer}`)

    // message is Buffer and parse here
    // if (message instanceof Buffer) {
    // if(isTypedArray(message)){
    if (message instanceof Uint8Array) {
        console.log(`Buffer.length: ${message.length}`)
        if (message.length > 0) {
            variables.eventBuffer.assign(message)
        } else {
            // if Buffer.length is zero, return the results
            _tofHistogramPort.postMessage(_tofHistogram)
            _rawImagePort.postMessage(_rawImage)
        }
    }
    // if (message.tofHistogramPort instanceof MessagePort) {
    if (message['tofHistogramPort'] instanceof MessagePort) {
        variables.tofHistogramPort.assign(message.tofHistogramPort)
        message.tofHistogramPort.on('message', (/** @type {import('../lib/index.js').Histogram}}*/message) => {
            console.log(`tofHistogram init`)
            variables.tofHistogram.assign(message)
        })
    }
    // if (message.rawImagePort instanceof MessagePort) {
    if (message['rawImagePort'] instanceof MessagePort) {
        variables.rawImagePort.assign(message.rawImagePort)
        message.rawImagePort.on('message', (/** @type {import('../lib/index.js').Histogram2D}}*/message) => {
            console.log(`rawImage init`)
            variables.rawImage.assign(message)
        })
    }
})