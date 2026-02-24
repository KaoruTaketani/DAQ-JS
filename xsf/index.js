import { createReadStream } from 'fs'
import { createInterface } from 'readline'

// readFile('../../xsf/graphene_00001.xsf', 'utf8', (err, data) => {
//     if (err) throw err

//     console.log(data)
// })

//
// http://www.xcrysden.org/doc/XSF.html
//
let datagrid3dType = ''
let numLinesPrimVec = 0
let numLinesConvVec = 0
let numLinesPrimCoord = 0
let numLinesAtomCoord = 0
let expectedSize = 1
let values = []
createInterface({
    input: createReadStream('../../xsf/graphene_00001.xsf', { encoding: 'utf8' })
    // output: channel
}).on('line', line => {
    // console.log(`recived: ${line}`)
    if (line === 'PRIMVEC') {
        numLinesPrimVec = 3
        return
    }
    if (numLinesPrimVec > 0) {
        console.log(`primVec: ${line}`)
        numLinesPrimVec--
        return
    }
    if (line === 'CONVVEC') {
        numLinesConvVec = 3
        return
    }
    if (numLinesConvVec > 0) {
        console.log(`convVec: ${line}`)
        numLinesConvVec--
        return
    }
    if (line === 'PRIMCOORD') {
        numLinesPrimCoord = 1
        return
    }
    if (numLinesPrimCoord > 0) {
        console.log(`primCoord: ${line}`)
        numLinesPrimCoord--
        numLinesAtomCoord = parseInt(line)
        return
    }
    if (numLinesAtomCoord > 0) {
        console.log(`atomCoord: ${line}`)
        numLinesAtomCoord--
        return
    }
    if (line === 'BEGIN_DATAGRID_3D_UNKNOWN') {
        datagrid3dType = 'size'
        return
    }
    if (line === 'END_DATAGRID_3D') {
        datagrid3dType = ''
        console.log(`expected: ${expectedSize.toLocaleString()}, actual: ${values.length.toLocaleString()}`)
        return
    }
    if (datagrid3dType === 'size') {
        console.log(`size: ${line}`)
        for (let i = 0; i < 3; ++i)
            expectedSize *= parseInt(line.substring(6 * i, 6 * (i + 1)))
        datagrid3dType = 'origin'
        return
    }
    if (datagrid3dType === 'origin') {
        console.log(`origin: ${line}`)
        datagrid3dType = 'vector1'
        return
    }
    if (datagrid3dType === 'vector1') {
        console.log(`vector1: ${line}`)
        datagrid3dType = 'vector2'
        return
    }
    if (datagrid3dType === 'vector2') {
        console.log(`vector2: ${line}`)
        datagrid3dType = 'vector3'
        return
    }
    if (datagrid3dType === 'vector3') {
        console.log(`vector3: ${line}`)
        datagrid3dType = 'value'
        return
    }
    if (datagrid3dType === 'value') {
        for (let i = 0; i < 6; ++i)
            values.push(parseFloat(line.substring(13 * i, 13 * (i + 1))))
    }
})