export default class {
    /**
     * @param {import('./ClientVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.addListener(arg => {
            this._path = arg
            this._operation()
        })
        this._operation = () => {
            fetch("/files?extname=edr&path=" + this._path).then(response => {
                if (!response.ok) {
                    document.body.innerHTML = response.statusText
                } else {
                    response.text().then(text => {variables.selectInnerHTML.assign(text) })
                }
            })
        }
    }
}
