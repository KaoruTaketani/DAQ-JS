import { createReadStream, readFile } from 'fs';
import { createInterface } from 'readline';
import prod from '../lib/prod.js';
import fliplr from '../lib/fliplr.js';
const h5wasm = await import("h5wasm/node");
await h5wasm.ready;

//
// https://gitlab.com/epw/q-e/-/blob/develop/EPW/ZG/src/ZG.f90
//
const startTime = Date.now()
let numAtomTypes // ntyp
let numAtoms // nat
let bravaisLatticeIndex // ibrav
let cellParameters = new Array(6) // celldm(6)
let i = 0
createInterface({
    input: createReadStream(`../../fc/aluminum.fc`, { encoding: 'utf8' })
    // output: channel
}).on('line', line => {
    if (i === 0) {
        const data = line.split(' ').filter(s => s.length > 0)
        numAtomTypes = parseInt(data[0])
        numAtoms = parseInt(data[1])
        bravaisLatticeIndex = parseInt(data[2])
        cellParameters[0] = parseFloat(data[3])
        cellParameters[1] = parseFloat(data[4])
        cellParameters[2] = parseFloat(data[5])
        cellParameters[3] = parseFloat(data[6])
        cellParameters[4] = parseFloat(data[7])
        cellParameters[5] = parseFloat(data[8])
    }
    i++
}).on('close', () => {
    const f = new h5wasm.File(`aluminum.h5`, 'w')
    f.create_attribute('numAtomTypes', numAtomTypes, null, '<i')
    f.create_attribute('numAtoms', numAtoms, null, '<i')
    f.create_attribute('bravaisLatticeIndex', bravaisLatticeIndex)
    f.create_attribute('cellParameters', cellParameters)

    f.close()
    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
})
