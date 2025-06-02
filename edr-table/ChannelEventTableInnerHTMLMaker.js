import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').ChannelEvent[]} */
        this._channelEvents
        variables.channelEvents.prependListener(arg => { this._channelEvents = arg })
        /** @type {number} */
        this._channelEventOffset
        variables.channelEventOffset.addListener(arg => {
            this._channelEventOffset = arg
            this._operation()
        })
        this._operation = () => {
            const sliced = this._channelEvents.slice(this._channelEventOffset, this._channelEventOffset + 25)
            if (sliced.length === 0) return

            variables.channelEventTableInnerHTML.assign([
                '<thead>',
                '<tr>',
                Object.keys(this._channelEvents[0]).map(key => `<th>${key}</th>`).join(''),
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
