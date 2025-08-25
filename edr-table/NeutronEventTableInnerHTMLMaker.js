import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').NeutronEvent[]} */
        this._neutronEvents
        variables.neutronEvents.prependListener(arg => { this._neutronEvents = arg })
        /** @type {number} */
        this._eventOffset
        variables.eventOffset.addListener(arg => {
            this._eventOffset = arg
            this._operation()
        })
        this._operation = () => {
            const sliced = this._neutronEvents.slice(this._eventOffset, this._eventOffset + 25)
            if (sliced.length === 0) return

            variables.tableInnerHTML.assign([
                '<thead>',
                '<tr>',
                Object.keys(this._neutronEvents[0]).map(key => `<th>${key}</th>`).join(''),
                '</tr>',
                '</thead>',
                '<tbody align="right">',
                sliced.map(obj => ['<tr>',
                    Object.keys(obj).map(key => {
                        /** @type {any} */
                        const tmp = obj
                        return `<td>${tmp[key].toLocaleString()}</td>`
                    }).join(''),
                    '</tr>'].join('')
                ).join(''),
                '</tbody>'
            ].join(''))
        }
    }
}
