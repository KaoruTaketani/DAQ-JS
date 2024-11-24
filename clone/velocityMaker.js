import { parentPort, workerData } from 'worker_threads'

console.log(`workerData: ${workerData}`)
parentPort.on('message', data => {
    console.log(`message : ${data}`)
    const tmp = JSON.parse(data)
    const velocityInMetersPerSecond = tmp.length / (tmp.tof * 1e-3)
    parentPort.postMessage({
        id: workerData,
        velocity: velocityInMetersPerSecond
    })
})
