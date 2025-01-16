import Variables from './Variables.js'
import HistogramMaker from './HistogramMaker.js'
import TotalCounter from './TotalCounter.js'

const variables = new Variables()
new HistogramMaker(variables)
new TotalCounter(variables)

variables.histogram.assign({
    binLimits: [0, 1],
    binCounts: new Array(10).fill(0)
})
// following code can not call setTimeout's callback in ThrottleOperator
// for (let i = 0; i < 100_000_000; ++i) variables.randomNumber.assign(Math.random())
for (let i = 0; i < 1_000_000; ++i) variables.randomNumber.assign(Math.random())
setTimeout(() => {
    for (let i = 0; i < 1_000_000; ++i) variables.randomNumber.assign(Math.random())
})