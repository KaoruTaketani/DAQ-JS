export default (
    axes,
    x,
    y
) => {
    if (!y) {
        // svg coordinate increases from left/top to right/bottom
        const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
            x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
            y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
            y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815)
        const peak = x.reduce((a, b) => Math.max(a, b), -Infinity)
        if (peak === 0) return ''
        // console.log(peak)
        // if (!axes.xLim) return ''
        // if (!axes.yLim) return ''
        // number[] is different from Int32Array
        /** @type {number[]} */
        const scaledY = axes.yAxisScale !== 'log'
            ? Array.from(x).map(v => v / peak)
            : Array.from(x).map(v => v === 0 ? 0.1 : v) // Math.log10(0) is NaN
                .map(v => (Math.log10(v) - Math.log10(0.1)) / (Math.log10(peak) - Math.log10(0.1)))
        // console.log(scaledY)
        const points = new Array(x.length).fill(0)
            .map((_, i) => [
                `${x0 + i * (x1 - x0) / x.length},${y0 + (y1 - y0) * scaledY[i]}`,
                `${x0 + (i + 1) * (x1 - x0) / x.length},${y0 + (y1 - y0) * scaledY[i]}`
            ].join(' '))


        return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
    } else {
        // svg coordinate increases from left/top to right/bottom
        const x0 = axes.parentWidth * (axes.innerLeft ?? 0.13),
            x1 = x0 + axes.parentWidth * (axes.innerWidth ?? 0.775),
            y0 = axes.parentHeight * (1 - (axes.innerBottom ?? 0.11)),
            y1 = y0 - axes.parentHeight * (axes.innerHeight ?? 0.815)
        const peakX = x.reduce((a, b) => Math.max(a, b), -Infinity),
            peakY = y.reduce((a, b) => Math.max(a, b), -Infinity)
        if (peakY === 0) return ''
        // console.log(peak)
        // if (!axes.xLim) return ''
        // if (!axes.yLim) return ''
        // number[] is different from Int32Array
        /** @type {number[]} */
        const scaledY = axes.yAxisScale !== 'log'
            ? y.map(v => v / peakY)
            : y.map(v => v === 0 ? 0.1 : v) // Math.log10(0) is NaN
                .map(v => (Math.log10(v) - Math.log10(0.1)) / (Math.log10(peakY) - Math.log10(0.1)))
        const scaledX = x.map(v => (v - x[0]) / (peakX - x[0]))
        // console.log(scaledY)
        const points = new Array(x.length - 1).fill(0)
            .map((_, i) => [
                `${x0 + scaledX[i] * (x1 - x0)},${y0 + (y1 - y0) * scaledY[i]}`,
                `${x0 + scaledX[i + 1] * (x1 - x0)},${y0 + (y1 - y0) * scaledY[i]}`
            ].join(' '))


        return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
    }
}