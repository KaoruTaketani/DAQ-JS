import { createReadStream, readFile } from 'fs';
import { createInterface } from 'readline';
import { ok } from 'assert'
import colon from '../lib/colon.js'
const h5wasm = await import("h5wasm/node");
await h5wasm.ready;

//
// https://gitlab.com/epw/q-e/-/blob/develop/EPW/ZG/src/ZG.f90
//
const startTime = Date.now()
const basename = 'aluminum'
let numAtomTypes // ntyp
let numAtoms // nat
let bravaisLatticeIndex // ibrav
let cellParameters = new Array(6) // celldm(6)
let atomNames // atm
let atomMassesIn // amass_from_file
let atomTypeIndex // ityp
let atomCoordinatesIn // tau
let forceConstans // frc

let i = 0
let nr1 // number of r1 points?
let nr2 // number of r2 points?
let nr3 // number of r3 points?
let pa // atom A polarization index
let pb // atom B polarization index
let ia // atom A atom index
let ib // atom B atom index
let ir1 // r1 index
let ir2 // r2 index
let ir3 // r3 index
let i_frc = 0 // index for forceConstants
createInterface({
    input: createReadStream(`../../fc/${basename}.fc`, { encoding: 'utf8' })
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
        atomTypeIndex = new Array(numAtoms)
        atomCoordinatesIn = new Array(3 * numAtoms)
    }
    if (colon(1, numAtomTypes).includes(i)) {

        const data = line.split("'")
        atomNames[i - 1] = data[1]
        atomMassesIn[i - 1] = parseFloat(data[2])
        // console.log(data)
    }
    if (colon(1, numAtoms).includes(i - numAtomTypes)) {
        const data = line.split(' ').filter(s => s.length > 0)
        const j = i - numAtomTypes - 1
        console.log(data)
        atomTypeIndex[j] = parseInt(data[1])
        atomCoordinatesIn[3 * j] = parseFloat(data[2])
        atomCoordinatesIn[3 * j + 1] = parseFloat(data[3])
        atomCoordinatesIn[3 * j + 2] = parseFloat(data[4])
    }
    if (i === numAtoms + numAtomTypes + 1) {
        console.log(line === ' F')
    }
    if (i === numAtoms + numAtomTypes + 2) {
        const data = line.split(' ').filter(s => s.length > 0)
        console.log(data)
        nr1 = parseInt(data[0])
        nr2 = parseInt(data[1])
        nr3 = parseInt(data[2])

        forceConstans = new Array(3 * 3 * numAtoms * numAtoms * nr1 * nr2 * nr3)
    }
    if (i > numAtoms + numAtomTypes + 2) {
        const j = i - (numAtoms + numAtomTypes + 3)
        if ((j % (nr1 * nr2 * nr3 + 1)) === 0) {
            // console.log(i)
            // console.log(line)
            // const data = line.split(' ').filter(s => s.length > 0)
            // pa = parseInt(data[0])
            // pb = parseInt(data[1])
            // ia = parseInt(data[2])
            // ib = parseInt(data[3])
            // console.log([pa, pb, ia, ib])
        } else {
            const data = line.split(' ').filter(s => s.length > 0)
            // ir1 = parseInt(data[0])
            // ir2 = parseInt(data[1])
            // ir3 = parseInt(data[2])
            forceConstans[i_frc] = parseFloat(data[3])
            i_frc++
            // console.log(parseFloat(data[3]))
        }
    }
    i++
}).on('close', () => {
    const f = new h5wasm.File(`${basename}.h5`, 'w')
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
    f.create_dataset({
        name: 'forceConstants',
        data: forceConstans,
        shape: [3, 3, numAtoms, numAtoms, nr3, nr2, nr1],
        chunks: [3, 3, numAtoms, numAtoms, nr3, nr2, nr1],
        compression: 'gzip'
    })

    f.close()
    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
})
