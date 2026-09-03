import { ok } from 'assert'
import { parentPort } from 'worker_threads'
import WorkerVariables from "./WorkerVariables.js"

const variables = new WorkerVariables()


ok(parentPort)
parentPort.on('message', message => {
    // console.log(`${isTypedArray(message)} ${message instanceof Uint8Array} ${message instanceof Buffer}`)
    variables.message.assign(message)

    if (message instanceof Uint8Array) {
        // console.log(`Buffer.length: ${message.length}`)
        if (message.length > 0) {
            variables.eventBuffer.assign(message)
        }
    }
})