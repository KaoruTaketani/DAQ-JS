import express from 'express';
import { join } from 'path';

const router = express.Router();

router.get('/getCurrentPoint.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/getCurrentPoint.js'))
})
router.get('/getXLim.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/getXLim.js'))
})
router.get('/getYLim.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/getYLim.js'))
})
router.get('/isbetween.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/isbetween.js'))
})
router.get('/polyfit.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/polyfit.js'))
})
router.get('/polyval.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/polyval.js'))
})
router.get('/axes.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/axes.js'))
})
router.get('/scatter.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/scatter.js'))
})
router.get('/line.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/line.js'))
})
router.get('/bounds.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/bounds.js'))
})
router.get('/mldivide.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/mldivide.js'))
})
router.get('/transpose.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/transpose.js'))
})
router.get('/zeros.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/zeros.js'))
})
router.get('/sum.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/sum.js'))
})
router.get('/dot.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/dot.js'))
})
router.get('/power.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/power.js'))
})
router.get('/size.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/size.js'))
})
router.get('/lu.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/lu.js'))
})
router.get('/mtimes.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/mtimes.js'))
})
router.get('/eye.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/eye.js'))
})
router.get('/stairs.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/stairs.js'))
})
router.get('/xlabel.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/xlabel.js'))
})
router.get('/ylabel.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/ylabel.js'))
})
router.get('/imcrop.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/imcrop.js'))
})
router.get('/imagesc.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/imagesc.js'))
})
router.get('/rescale.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/rescale.js'))
})
router.get('/sub2ind.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/sub2ind.js'))
})
router.get('/colon.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/colon.js'))
})
router.get('/min.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/min.js'))
})
router.get('/max.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/max.js'))
})
router.get('/std.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/std.js'))
})
router.get('/mean.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/mean.js'))
})
router.get('/linspace.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/linspace.js'))
})
router.get('/gauss1.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/gauss1.js'))
})
router.get('/trapz.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/trapz.js'))
})
router.get('/deg2rad.js', (_req, res) => {
    res.sendFile(join(import.meta.dirname, '../lib/deg2rad.js'))
})


export default router;