export default class {
    /**
     * @param {import('./ClientTableVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._filePath
        variables.filePath.addListener(arg => {
            this._filePath = arg
            this._operation()
        })
        this._operation = () => {
            fetch(`${this._filePath}?type=numEvents`).then(response => {
                response.text().then(text => {
                    variables.divInnerText.assign(text)
                })
            })
        }
    }
}
