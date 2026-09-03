import DistributedObject from './DistributedObject.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.message = new ListenableObject()

        /** @type {import('./ListenableObject.js').default<Uint8Array>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channel0Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channel1Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').PairedEvent>} */
        this.pairedEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').NeutronEvent>} */
        this.neutronEvent = new ListenableObject()

        this.tofHistogram = new DistributedObject('tofHistogram', this.message)
    }
}
