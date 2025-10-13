import Operator from './Operator.js'
import SocketQueue from './SocketQueue.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.xDestinationValue.assign('NaN')
            variables.thetaDestinationValue.assign('NaN')
            // const socket = new Socket()
            // socket.setEncoding('utf8')
            // const taskQueue = new TaskQueue()
            const socketQueue = new SocketQueue()
            // socket.once('data', (/** @type {string} */data) => {
            //     console.log(`data: ${data}`)
            //     const x = parseInt(data.split(' ')[1])
            //     variables.xPulse.assign(x)
            //     socket.end()
            // }).once('close', () => {
            //     console.log(`close`)
            //     socket.once('data', (/** @type {string} */data) => {
            //         console.log(`2nd data: ${data}`)
            //         const theta = parseInt(data.split(' ')[1])
            //         variables.thetaPulse.assign(theta)
            //         socket.end()
            //     }).once('close', () => {
            //         console.log('2nd close')
            //     }).connect(23, 'localhost', () => {
            //         socket.write('pulse?:1')
            //     })
            // }).connect(23, 'localhost', () => {
            //     socket.write(`pulse?:0`)
            // })
            // following code fails to assign thetaPulse as data are same
            // socket.connect(23, 'localhost', () => {
            //     socket.once('data', (/** @type {string} */data) => {
            //         console.log(`data: ${data}`)
            //         const x = parseInt(data.split(' ')[1])
            //         variables.xPulse.assign(x)
            //     }).write(`pulse?:0`)
            //     socket.once('data', (/** @type {string} */data) => {
            //         console.log(`2nd data: ${data}`)
            //         const theta = parseInt(data.split(' ')[1])
            //         variables.thetaPulse.assign(theta)
            //
            //         socket.end()
            //     }).write('pulse?:1')
            // })
            // socket.connect(23, 'localhost', () => {
            //     taskQueue.push((/** @type {()=>void} */ done) => {
            //         socket.once('data', (/** @type {string} */data) => {
            //             console.log(`data: ${data}`)
            //             const x = parseInt(data.split(' ')[1])
            //             variables.xPulse.assign(x)
            //             done()
            //         }).write(`pulse?:0`)
            //     })
            //     taskQueue.push((/** @type {()=>void} */ done) => {
            //         socket.once('data', (/** @type {string} */data) => {
            //             console.log(`2nd data: ${data}`)
            //             const theta = parseInt(data.split(' ')[1])
            //             variables.thetaPulse.assign(theta)

            //             socket.end()
            //             done()
            //         }).write('pulse?:1')
            //     })
            // })
            socketQueue.push((/** @type {import('net').Socket}*/socket,/** @type {()=>void} */ done) => {
                socket.once('data', (/** @type {string} */data) => {
                    console.log(`data: ${data}`)
                    const x = parseInt(data.split(' ')[1])
                    variables.xPulse.assign(x)
                    done()
                }).write(`pulse?:0`)
            })
            socketQueue.push((/** @type {import('net').Socket}*/socket,/** @type {()=>void} */ done) => {
                socket.once('data', (/** @type {string} */data) => {
                    console.log(`2nd data: ${data}`)
                    const theta = parseInt(data.split(' ')[1])
                    variables.thetaPulse.assign(theta)
                    // socket.end()
                    done()
                }).write('pulse?:1')
            })
        }
    }
}

