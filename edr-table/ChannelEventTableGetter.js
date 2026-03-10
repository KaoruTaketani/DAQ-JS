export default class {
    /**
     * @param {import('./ChannelEventVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {number} */
        this._offset
        variables.offset.addListener(arg => {
            this._offset = arg
            this._operation()
        })
        /** @type {string} */
        this._filePath
        variables.filePath.addListener(arg => {
            this._filePath = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._filePath) return

            fetch(`${this._filePath}?type=channel&offset=${this._offset}`).then(response => {
                response.text().then(text => {
                    variables.tableInnerText.assign(text)
                })
            })
        }
    }
}
