import lsqnonlin from './lsqnonlin.js'
import linspace from './linspace.js'
import minus from './minus.js'
import exp from './exp.js'
import plus from './plus.js'

console.log(`${lsqnonlin(
    r => {
        d = linspace(0, 3)
        y = plus(exp(times(-1.3, d)), times(0.05, rand(d.length)))
        return minus(d.map(Math.exp(-1.3)))
    },
    [100, -1],
    [0.9, 1.5, 13.8, 19.8, 24.1, 28.2, 35.2, 60.3, 74.6, 81.3],
    [455.2, 428.6, 124.1, 67.3, 43.2, 28.1, 13.1, -0.4, -1.3, -1.5]
)}`)


