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
        const scaledY = Array.from(x).map(v => v / peak)
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
        const scaledY = y.map(v => v / peakY)
        const scaledX = x.map(v => (v - x[0]) / (peakX - x[0]))

        const points = new Array(x.length - 1).fill(0)
            .map((_, i) => [
                `${x0 + scaledX[i] * (x1 - x0)},${y0 + (y1 - y0) * scaledY[i]}`,
                `${x0 + scaledX[i + 1] * (x1 - x0)},${y0 + (y1 - y0) * scaledY[i]}`
            ].join(' '))


        return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`
    }
}