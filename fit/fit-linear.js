import minus from './minus.js'
import sum from './sum.js'
import times from './times.js'

// Mathews p 254 table 5.1
const x = [-1, 0, 1, 2, 3, 4, 5, 6],
    y = [10, 9, 7, 5, 4, 3, 0, -1],
    f = x.map(x => 8.6 - 1.6 * x),
    d = minus(y, f),
    rms = d.reduce((prev, current) => Math.hypot(prev, current), 0)
console.log(d.map(d => d ** 2))
console.log(rms ** 2)
// Mathews p 256 table 5.2
console.log(sum(x))
console.log(x.map(x => x ** 2))
console.log(sum(y))
console.log(sum(x.map(x => x ** 2)))
console.log(times(x, y))
console.log(sum(times(x, y)))
const a = [sum(x.map(x => x ** 2)), sum(x), sum(x), x.length],
    b = [sum(times(x, y)), sum(y)]
console.log(a)
console.log(b)
// needs mldivide(a,b) to obtain linear parameters

// mldivide([92 20;20 8],[25;37]) returns [-1.6071; 8.6429] in octave as expected
