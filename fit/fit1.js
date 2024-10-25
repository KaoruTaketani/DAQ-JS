import fsolve from './fsolve.js'

console.log(`${fsolve(x => [
    x[0] ** 2 + 4 * x[1] ** 2 - 5,
    2 * x[0] ** 2 - 2 * x[0] - 3 * x[1] - .25
], [0.8, 0.2])}`)

