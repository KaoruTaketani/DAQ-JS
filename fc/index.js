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
// const basename = 'aluminum'
const basename = 'silicon'
let numAtomTypes // ntyp
let numAtoms // nat
let bravaisLatticeIndex // ibrav
let cellParameters = new Float64Array(6) // celldm(6)
let fundamentalVector1InAngstroms = new Float64Array(3) // a1(3)
let fundamentalVector2InAngstroms = new Float64Array(3) // a2(3)
let fundamentalVector3InAngstroms = new Float64Array(3) // a3(3)
let atomNames // atm
let atomMassesInAtomicMassUnit // amass_from_file / amu_ry
let atomTypeIndex // ityp
let atomPositionCoefficients // tau
let forceConstans // frc
let hasZstar // has_zstar
let dielectricConstant//epsil
let bornEffectiveCharges//zeu

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
let i_zeu = 0 // index for bornEffectiveCharges
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
        atomMassesInAtomicMassUnit = new Float64Array(numAtomTypes)
        atomNames = new Array(numAtomTypes)
        atomTypeIndex = new Int32Array(numAtoms)
        atomPositionCoefficients = new Float64Array(3 * numAtoms)
        //
        // https://gitlab.com/epw/q-e/-/blob/develop/Modules/latgen.f90
        //
        if (bravaisLatticeIndex === 2) {
            // fcc
            //
            // https://gitlab.com/epw/q-e/-/blob/develop/Modules/constants.f90
            //
            const BOHR_RADIUS_SI = 0.529177210903E-10 // m
            const BOHR_RADIUS_CM = BOHR_RADIUS_SI * 100.0
            const BOHR_RADIUS_ANGS = BOHR_RADIUS_CM * 1.0E8
            const term = (cellParameters[0] * BOHR_RADIUS_ANGS) / 2

            fundamentalVector1InAngstroms[0] = -term // a1(1)
            fundamentalVector1InAngstroms[2] = term // a1(3)
            fundamentalVector2InAngstroms[1] = term //  a2(2)
            fundamentalVector2InAngstroms[2] = term // a2(3)
            fundamentalVector3InAngstroms[0] = -term // a3(1)
            fundamentalVector3InAngstroms[1] = term // a3(2)
        }
    }
    if (colon(1, numAtomTypes).includes(i)) {
        //
        // https://gitlab.com/epw/q-e/-/blob/develop/Modules/constants.f90
        //
        const AMU_SI = 1.66053906660E-27 // kg
        const ELECTRONMASS_SI = 9.1093837015E-31 // kg
        const AMU_AU = AMU_SI / ELECTRONMASS_SI
        const AMU_RY = AMU_AU / 2

        const data = line.split("'")
        atomNames[i - 1] = data[1]
        atomMassesInAtomicMassUnit[i - 1] = parseFloat(data[2]) / AMU_RY
        // console.log(data)
    }
    if (colon(1, numAtoms).includes(i - numAtomTypes)) {
        const data = line.split(' ').filter(s => s.length > 0)
        const j = i - numAtomTypes - 1
        console.log(data)
        atomTypeIndex[j] = parseInt(data[1])
        atomPositionCoefficients[3 * j] = parseFloat(data[2])
        atomPositionCoefficients[3 * j + 1] = parseFloat(data[3])
        atomPositionCoefficients[3 * j + 2] = parseFloat(data[4])
    }
    if (i === numAtoms + numAtomTypes + 1) {
        hasZstar = line === ' T'
        console.log(`hasZstar: ${hasZstar}`)
        if (hasZstar) {
            dielectricConstant = new Float64Array(3 * 3)
            bornEffectiveCharges = new Float64Array(numAtoms * 3 * 3)
        }
    }
    if (!hasZstar) {
        if (i === numAtoms + numAtomTypes + 2) {
            const data = line.split(' ').filter(s => s.length > 0)
            console.log(data)
            nr1 = parseInt(data[0])
            nr2 = parseInt(data[1])
            nr3 = parseInt(data[2])

            forceConstans = new Float64Array(3 * 3 * numAtoms * numAtoms * nr1 * nr2 * nr3)
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
    } else {
        if (colon(1, 3).includes(i - numAtomTypes - numAtoms - 1)) {
            const j = (i - numAtomTypes - numAtoms - 1) - 1
            const data = line.split(' ').filter(s => s.length > 0)
            dielectricConstant[3 * j] = parseFloat(data[0])
            dielectricConstant[3 * j + 1] = parseFloat(data[1])
            dielectricConstant[3 * j + 2] = parseFloat(data[2])
        }
        if (colon(1, 4 * numAtoms).includes(i - numAtomTypes - numAtoms - 4)) {
            // console.log(`${j} ${line}`)
            const j = (i - numAtomTypes - numAtoms - 4) - 1
            // console.log(j,line)
            if (j % 4 === 0) {
                // console.log(line)
            } else {
                const data = line.split(' ').filter(s => s.length > 0)
                bornEffectiveCharges[3 * i_zeu] = parseFloat(data[0])
                bornEffectiveCharges[3 * i_zeu + 1] = parseFloat(data[1])
                bornEffectiveCharges[3 * i_zeu + 2] = parseFloat(data[2])
                i_zeu++
            }
        }
        if (i === numAtoms + numAtomTypes + 2 + 3 + 4 * numAtoms) {
            const data = line.split(' ').filter(s => s.length > 0)
            console.log(data)
            nr1 = parseInt(data[0])
            nr2 = parseInt(data[1])
            nr3 = parseInt(data[2])

            forceConstans = new Float64Array(3 * 3 * numAtoms * numAtoms * nr1 * nr2 * nr3)
        }
        if (i > numAtoms + numAtomTypes + 2 + 3 + 4 * numAtoms) {
            const j = i - (numAtoms + numAtomTypes + 2 + 3 + 4 * numAtoms + 1)
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
    }
    i++
}).on('close', () => {
    const f = new h5wasm.File(`${basename}.h5`, 'w')
    f.create_attribute('numAtomTypes', numAtomTypes, null, '<i')
    f.create_attribute('numAtoms', numAtoms, null, '<i')
    f.create_attribute('bravaisLatticeIndex', bravaisLatticeIndex, null, '<i')
    f.create_attribute('cellParameters', cellParameters)
    f.create_attribute('fundamentalVector1InAngstroms', fundamentalVector1InAngstroms)
    f.create_attribute('fundamentalVector2InAngstroms', fundamentalVector2InAngstroms)
    f.create_attribute('fundamentalVector3InAngstroms', fundamentalVector3InAngstroms)
    f.create_attribute('atomNames', atomNames)
    f.create_attribute('atomMassesInAtomicMassUnits', atomMassesInAtomicMassUnit)
    f.create_dataset({
        name: 'atomPositionCoefficients',
        data: atomPositionCoefficients,
        shape: [numAtoms, 3],
        chunks: [numAtoms, 3],
        compression: 'gzip'
    })
    // if (dielectricConstant) f.create_attribute('dielectricConstant', dielectricConstant)
    if (dielectricConstant) f.create_dataset({
        name: 'dielectricConstant',
        data: dielectricConstant,
        shape: [3, 3]
    })
    if (bornEffectiveCharges) f.create_dataset({
        name: 'bornEffectiveCharges',
        data: bornEffectiveCharges,
        shape: [numAtoms, 3, 3]
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
