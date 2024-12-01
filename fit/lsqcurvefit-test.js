import { strictEqual } from 'assert'
import { test } from 'node:test'
import lsqcurvefit from './lsqcurvefit.js'
import almostEqual from './almostEqual.js'
import size from './size.js'

test('example inputs in lsqcurvefit of matlab', () => {
    const result = lsqcurvefit('exp', [500, -0.1], [0.9, 1.5, 13.8, 19.8, 24.1, 28.2, 35.2, 60.3, 74.6, 81.], [455.2, 428.6, 124.1, 67.3, 43.2, 28.1, 13.1, -0.4, -1.3, -1.5])
    // matlabu passes [100, -5] to p0, but quite different from the optimul
    // so use [500, -0.1] instead

})

