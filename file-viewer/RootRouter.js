import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <h2>SIGB</h2>`,
        `    <p><a href="./Headers.html">Headers</a></p>`,
        `    <p><a href="./WaveformArray.html">Waveform Array</a></p>`,
        `    <h2>EDR</h2>`,
        `    <p><a href="./Table.html">Table</a></p>`,
        `    <h2>JSON</h2>`,
        `    <p><a href="./Objects.html">Objects</a></p>`,
        `    <h2>HDF5</h2>`,
        `    <p><a href="./Attributes.html">Attributes</a></p>`,
        `    <p><a href="./XY.html">XY</a></p>`,
        `    <p><a href="./Waveform.html">Waveform</a></p>`,
        `    <p><a href="./Image.html">Image</a></p>`,
        `    <h2>Calculator</h2>`,
        `    <p><a href="./Slit.html">Slit</a></p>`,
        `    <p><a href="./QRange.html">Q Range</a></p>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

export default router;