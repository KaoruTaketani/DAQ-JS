import lsqcurvefit from './lsqcurvefit.js'

console.log(`${lsqcurvefit(
    (x, xdata) => x[0] * Math.exp(x[1] * xdata)
    [100, -1],
    [0.9, 1.5, 13.8, 19.8, 24.1, 28.2, 35.2, 60.3, 74.6, 81.3],
    [455.2, 428.6, 124.1, 67.3, 43.2, 28.1, 13.1, -0.4, -1.3, -1.5]
)}`)


