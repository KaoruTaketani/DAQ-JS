import { readdirSync, readFileSync } from 'fs'
import { basename, join } from 'path'
import { hostname } from 'os'
//import { File, ready } from 'h5wasm/node'
const h5wasm = await import("h5wasm/node");
await h5wasm.ready;

// first 1024bytes are header
// file is big endian and os.endianess() returns LE, so use DataView
const nmrPath = '../../sigb/2015/1203',
  hdf5Path = '../../hdf5/nmr/',
  name = '215825'

const file = new h5wasm.File(join(hdf5Path, name + '.h5'), 'w')

// file.create_attribute('centerInHertz', 213_000_000, null, '<i')
// file.create_attribute('widthInHertz', 1_000_000, null, '<i')
// file.create_attribute('numSweeps', 500, null, '<i')

const sigb = readFileSync(join(nmrPath, name + '.sigb')),
  sigv = new DataView(sigb.buffer, 1024),
  sig = new Array(501).fill(0),
  n = (sigb.length - 1024) / 8 / 501 // this is 500

for (let i = 0; i < 501; ++i) {
  for (let j = 0; j < n; ++j) {
    sig[i] += sigv.getFloat64((i + j * 501) * 8)
  }
}
file.create_dataset({
  name: 'sum',
  data: sig
})
file.close()
