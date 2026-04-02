export default class {
    /**
     * @param {import('./TableVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string} */
        this._fileName
        variables.fileName.addListener(arg => {
            this._fileName = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._fileName.endsWith('.edr')) return

            fetch(`/numEvents?path=${this._path}&fileName=${this._fileName}`).then(response => {
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
