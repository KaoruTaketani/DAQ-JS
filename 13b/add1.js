import ListenableNumber from './ListenableNumber.js'

const length = new ListenableNumber()
const angle = new ListenableNumber()

///
/// operator 1
///
let _length
length.addListener(arg => { _length = arg })
let _angle
angle.addListener(arg => {
    _angle = arg
    console.log(`length: ${_length}, angle: ${_angle}`)
})
///
/// operator 2
///
length.addListener(_ => {
    angle.assign(5)
})


length.assign(10)
