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
            blockList.addRange('0.0.0.0', '126.255.255.255', 'ipv4');
            blockList.addRange('128.0.0.0', '255.255.255.255', 'ipv4');
            blockList.addRange('::', '::0', 'ipv6');
            blockList.addRange('::2', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ipv6');
            variables.blockList.assign(blockList)

            this._httpServer.listen(80)
        }
    }
}

