import express from 'express';

const router = express.Router();

router.get('/Attributes.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./AttributesClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

router.get('/Image.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./ImageClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

router.get('/QRange.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./QRangeClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

router.get('/Slit.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./SlitClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

router.get('/Table.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./TableClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

router.get('/Waveform.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./WaveformClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})


router.get('/XY.html', (_req, res) => {
    res.send([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./XYClient.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})

export default router;