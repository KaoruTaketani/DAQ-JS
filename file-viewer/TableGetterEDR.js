export default class {
    /**
     * @param {import('./TableVariablesEDR.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {number} */
        this._offset
        variables.offset.addListener(arg => {
            this._offset = arg
            this._operation()
        })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._fileNames) return
            if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.edr')) return

            // @ts-ignore
            const pathname = window.pathname
            fetch(`${pathname}?path=${this._path}&fileName=${this._fileNames[0]}&offset=${this._offset}`).then(response => {
                response.text().then(text => {
                    variables.tableInnerHTML.assign(text)
                })
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.tableInnerHTML.assign('')
            })
        }
    }
}
