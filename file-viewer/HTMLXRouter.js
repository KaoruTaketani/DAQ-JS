import express from 'express';
import { basename } from 'path'

const router = express.Router();

const innerHTML = reqPath => [
    '<html>',
    '<head>',
    '    <meta charset="utf-8">',
    '</head>',
    '<body>',
    `    <script type="module" src="./${basename(reqPath, '.html')}Client.js">`,
    `    </script>`,
    '</body>',
    '</html>'
].join('\n')

router.get('/Attributes.html', (req, res) => { res.send(innerHTML(req.path)) })
router.get('/Image.html', (req, res) => { res.send(innerHTML(req.path)) })
router.get('/QRange.html', (req, res) => { res.send(innerHTML(req.path)) })
router.get('/Slit.html', (req, res) => { res.send(innerHTML(req.path)) })
router.get('/Table.html', (req, res) => { res.send(innerHTML(req.path)) })
router.get('/Waveform.html', (req, res) => { res.send(innerHTML(req.path)) })
router.get('/XY.html', (req, res) => { res.send(innerHTML(req.path)) })

export default router;