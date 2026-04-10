import { createReadStream, readFile } from 'fs';
import { createInterface } from 'readline';
import { ok } from 'assert'
import colon from '../lib/colon.js'
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
let atomNames // atm
let atomMassesIn // amass_from_file
let atomTypeIndex // ityp
let atomCoordinatesIn // tau
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

        ok(bravaisLatticeIndex !== 0)
        // if bravaisLatticeIndex is 0, the file has at(3,3)
        atomMassesIn = new Array(numAtomTypes)
        atomNames = new Array(numAtomTypes)
    }
    if (colon(1, numAtomTypes).includes(i)) {

        const data = line.split("'")
        atomNames[i - 1] = data[1]
        atomMassesIn[i - 1] = parseFloat(data[2])
        // console.log(data)
    }
    atomTypeIndex = new Array(numAtoms)
    atomCoordinatesIn = new Array(3 * numAtoms)
    if (colon(1, numAtoms).includes(i - numAtomTypes)) {
        const data = line.split(' ').filter(s => s.length > 0)
        const j = i - numAtomTypes - 1
        console.log(data)
        atomTypeIndex[j] = parseInt(data[1])
        atomCoordinatesIn[3 * j] = parseFloat(data[2])
        atomCoordinatesIn[3 * j + 1] = parseFloat(data[3])
        atomCoordinatesIn[3 * j + 2] = parseFloat(data[4])
    }
    i++
}).on('close', () => {
    const f = new h5wasm.File(`aluminum.h5`, 'w')
    f.create_attribute('numAtomTypes', numAtomTypes, null, '<i')
    f.create_attribute('numAtoms', numAtoms, null, '<i')
    f.create_attribute('bravaisLatticeIndex', bravaisLatticeIndex, null, '<i')
    f.create_attribute('cellParameters', cellParameters)
    f.create_attribute('atomNames', atomNames)
    f.create_attribute('atomMassesIn', atomMassesIn)
    f.create_dataset({
        name: 'atomCoordinatesIn',
        data: atomCoordinatesIn,
        shape: [numAtoms, 3],
        chunks: [numAtoms, 3],
        compression: 'gzip'
    })

    f.close()
    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
})
