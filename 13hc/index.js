import FrequencyListener from './FrequencyListener.js'
import PhaseListener from './PhaseListener.js'
import VISAQueueMaker from './VISAQueueMaker.js'
import Variables from './Variables.js'

const variables = new Variables()

new VISAQueueMaker(variables)
new FrequencyListener(variables)
new PhaseListener(variables)

variables.visaParsers.assign(new Map())
variables.frequency.sync()
variables.phase.sync()

