import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').PairedEvent[]} */
        this._pairedEvents
        variables.pairedEvents.prependListener(arg => { this._pairedEvents = arg })
        /** @type {number} */
        this._pairedEventOffset
        variables.pairedEventOffset.addListener(arg => {
            this._pairedEventOffset = arg
            this._operation()
        })
        this._operation = () => {
            const sliced = this._pairedEvents.slice(this._pairedEventOffset, this._pairedEventOffset + 25)
            if (sliced.length === 0) return

            variables.pairedEventTableInnerHTML.assign([
                '<thead>',
                '<tr>',
                Object.keys(this._pairedEvents[0]).map(key => `<th>${key}</th>`).join(''),
                '</tr>',
                '</thead>',
                '<tbody align=\\"right\\">',// backslash is necessary if string contains ""
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
