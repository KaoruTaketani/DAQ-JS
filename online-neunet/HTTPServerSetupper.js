import Operator from './Operator.js'
import { BlockList } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            variables.webSocketPathnames.assign(new Map())
            variables.elementValues.assign(new Map())
            const blockList = new BlockList()
            blockList.addRange('0.0.0.0', '255.255.255.255')
            variables.blockList.assign(blockList)

            this._httpServer.listen(80)
        }
    }
}

