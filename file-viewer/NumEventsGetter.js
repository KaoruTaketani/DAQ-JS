export default class {
    /**
     * @param {import('./TableVariablesEDR.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.edr')) return

            fetch(`/numEvents?path=${this._path}&fileName=${this._fileNames[0]}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('failed numEvents')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign(text)
                    })
                }
            })
        }
    }
}
