import ListenableBoolean from './ListenableBoolean.js'
import ListenableNumber from './ListenableNumber.js'

const isBusy = new ListenableBoolean()
const voltage = new ListenableNumber()

voltage.addListener(arg => { console.log(`voltage is ${arg}`) })
isBusy.addListener(arg => {
    console.log(`isBusy is ${arg}`)

    if (!arg) return
    setTimeout(() => {
        isBusy.assign(false)
    }, 1000)
})

const voltages = [20, 10, 0]

voltages.reduce((previous, value) => previous.then(() =>
    new Promise(resolve => {
        voltage.assign(value)
        isBusy.assign(true)
        // console.log('add once')
        isBusy.addOnceListener(() => {
            console.log('once')
            resolve()
        })
    })
), Promise.resolve())

