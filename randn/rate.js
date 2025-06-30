import rand from '../lib/rand.js'
import mean from '../lib/mean.js'
import std from '../lib/std.js'

const settings = [
    {
        "eventLength": 100000,
        "repeatingTimes": 5000
    }
    // , {
    //     "eventLength": 500000,
    //     "repeatingTimes": 1000
    // }
    // ,{
    //     "eventLength": 1000000,
    //     "repeatingTimes": 500
    // }
],
    results = []
settings.forEach(setting => {
    console.log(`${setting.repeatingTimes}, ${setting.eventLength}`)
    const elapsedTimes = new Array(setting.repeatingTimes).fill()
    for (let i = 0; i < setting.repeatingTimes; ++i) {
        const startTime = Date.now()
        const tmp = rand(setting.eventLength,1)
        elapsedTimes[i] = Date.now() - startTime
    }
    console.log('done')
    results.push({
        eventLength: setting.eventLength,
        repeatingTimes: setting.repeatingTimes,
        meanTime: mean(elapsedTimes),
        stdTime: std(elapsedTimes),
        meanRate: setting.eventLength / (mean(elapsedTimes) / 1000)
    })
})
console.log(results)
