import { parentPort } from 'worker_threads'
import { workerData } from 'worker_threads'

const sharedArray = new Uint32Array(workerData)

parentPort.on('message', message => {
    if (message === null) {
        // console.log('exit')
        process.exit(0)
        return
    }
    const chunk = new Uint8Array(message)
    // console.log(chunk.length)
    for (let i = 0; i < chunk.length / 8; ++i) {
        switch (chunk[8 * i]) {
            case 0x5a:
                // a++
                Atomics.add(sharedArray, 0, 1)
                break
            case 0x5b:
                // b++
                Atomics.add(sharedArray, 1, 1)
                break
            case 0x5c:
                // c++
                Atomics.add(sharedArray, 2, 1)
                break
            default:
                // d++
                Atomics.add(sharedArray, 3, 1)
        }
    }
})