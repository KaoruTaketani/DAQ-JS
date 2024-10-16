import ControllableBoolean from './ControllableBoolean.js'
import ControllableNumber from './ControllableNumber.js'
import ListenableObject from './ListenableObject.js'

const message = new ListenableObject()
const isBusy = new ControllableBoolean('isBusy', message)
const voltage = new ControllableNumber('voltage', message)

voltage.addListener(arg => { console.log(`voltage is ${arg}`) })
isBusy.addListener(arg => {
    console.log(`isBusy is ${arg}`)

    if (!arg) return
    setTimeout(() => {
        isBusy.assign(false)
    }, 1000)
})

const batchMessages = [
    { voltage: 0 },
    { isBusy: true },
    { voltage: 10 },
    { isBusy: true },
    { voltage: 20 },
    { isBusy: true },
    { voltage: 0 }
]
batchMessages.reduce((previous, batchMessage) => previous.then(() =>
    new Promise(resolve => {
        message.assign(batchMessage)
        if (batchMessage['isBusy']) {
            isBusy.addOnceListener(() => {
                console.log('once')
                resolve()
            })
        } else {
            resolve()
        }
    })
), Promise.resolve())

