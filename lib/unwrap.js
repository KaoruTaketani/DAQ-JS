/**
 * @param {number[]} P
 * @returns {number[]}
 */
export default (
    P
) => {
    const Q = Array.from(P)
    for (let i = 1; i < P.length; ++i) {
        // if the difference is in [-Pi,Pi], n is zero
        // if the difference is in [Pi, 3 Pi], n is 1 or 2. use n to shift -2 Pi 
        // if the difference is in [3 Pi, 5 Pi], n is 3 or 4. use n to shift -4 Pi 
        // if the difference is in [-3 Pi, -Pi], n is -2 or -1. use n to shift 2 Pi
        // if the difference is in [-5 Pi, -3 Pi], n is -4 or -3. use n to shift 4 Pi 
        const n = Math.trunc((Q[i] - Q[i - 1]) / Math.PI)
        const m = n + (n % 2)

        Q[i] -= m * Math.PI
    }
    return Q
}