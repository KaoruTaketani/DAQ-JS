export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
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
            fetch(`/attributes?path=${this._path}`).then(response => {
                response.json().then(data => {
                    variables.attributes.assign(data)

                    const keys = new Set()
                    data.forEach((/** @type {object}*/obj) => { Object.keys(obj).forEach(key => { keys.add(key) }) })
                    const visibleKeys = Array.from(keys).filter(key => key !== '_name')
                    variables.visibleKeys.assign(visibleKeys)
                    variables.visibleInnerHTML.assign(visibleKeys.map(key => `<option selected>${key}</option>`).join(''))
                })
            })
        }
    }
}
