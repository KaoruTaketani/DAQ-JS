export default class {
    /**
     * @param {import('./ChannelEventVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {HTMLSelectElement} */
        this._selectElement
        variables.selectElement.prependListener(arg => { this._selectElement = arg })
        /** @type {string} */
        this._path
        variables.path.addListener(arg => {
            this._path = arg
            this._operation()
        })
        this._operation = () => {
            fetch("/readdir?path=" + this._path).then(response => {
                if (!response.ok) {
                    document.body.innerHTML = response.statusText
                } else {
                    response.text().then(text => { this._selectElement.innerHTML = text })
                }
            })
        }
    }
}
