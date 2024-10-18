import ListenableNumber from './ListenableNumber.js'

const length = new ListenableNumber()
const angle = new ListenableNumber()

///
/// operator 2
///
length.addListener(_ => {
    angle.assign(5)
})
///
/// operator 1
///
let _length
length.prependListener(arg => { _length = arg })
let _angle
angle.addListener(arg => {
    _angle = arg
    console.log(`length: ${_length}, angle: ${_angle}`)
})


length.assign(10)
