export default class {
    /**
     * @param {import('./ImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string} */
        this._selectInnerHTML
        variables.selectInnerHTML.addListener(arg => {
            this._selectInnerHTML = arg
            this._operation()
        })
        this._operation = () => {
            fetch(`/keys?path=${this._path}&type=image`).then(response => {
                if (!response.ok) {
                    document.body.innerHTML = response.statusText
                } else {
                    response.text().then(text => {
                        const keys = JSON.parse(text)
                        variables.keysInnerHTML.assign(keys.map((/** @type {string} */key) => `<option>${key}</option>`))
                    })
                }
            })
        }
    }
}
