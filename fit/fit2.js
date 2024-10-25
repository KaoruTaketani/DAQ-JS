import minus from './minus.js'
// Mathews p 254 table 5.1
const x = [-1, 0, 1, 2, 3, 4, 5, 6],
    y = [10, 9, 7, 5, 4, 3, 0, -1],
    f = x.map(x => 8.6 - 1.6 * x),
    d = minus(y, f),
    rms = d.reduce((prev, current) => Math.hypot(prev, current), 0)
console.log(d.map(d => d ** 2))
console.log(rms ** 2)