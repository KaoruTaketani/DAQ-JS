import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} command 
     * @param {import('./ListenableObject.js').default<import('./SocketQueue.js').default>} queue 
     */
    constructor(command, queue) {
        super()
        this._command = command
        /** @type {import('./SocketQueue.js').default} */
        this._queue
        queue.addListener(arg => { this._queue = arg })
    }
    sync() {
        this._queue.push((/** @type {import('net').Socket}*/socket,/** @type {()=>void} */ done) => {
            socket.once('data', (/** @type {string} */data) => {
                // console.log(`data: ${data}`)
                const x = parseInt(data.split(' ')[1])
                super.assign(x)
                done()
            }).write(this._command)
        })
    }
}
