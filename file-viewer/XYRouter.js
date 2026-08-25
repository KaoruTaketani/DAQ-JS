import express from 'express';
import { join } from 'path';
import h5wasm from "h5wasm/node";
await h5wasm.ready;

const router = express.Router();

router.get('/xy', (req, res) => {
    // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
    let f = new h5wasm.File(join(process.env.hdf5Path, req.query.path, req.query.fileName), "r")

    /** @type {import('h5wasm').Dataset|null} */
    const datasetY =/** @type {import('h5wasm').Dataset|null} */ (f.get(req.query.ykey))
    if (!datasetY) {
        res.status(404).send()
        f.close()
        return
    }
    const datasetX =/** @type {import('h5wasm').Dataset|null} */ (f.get(req.query.xkey))
    if (!datasetX) {
        res.status(404).send()
        f.close()
        return
    }
    const y = Array.from(/** @type {Float64Array} */(datasetY.value))
    const x = Array.from(/** @type {Float64Array} */(datasetX.value))

    res.json({
        x: x,
        y: y
    })
    f.close()
})

export default router;