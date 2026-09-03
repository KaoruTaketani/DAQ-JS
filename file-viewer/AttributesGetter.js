export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._extname
        variables.extname.prependListener(arg => { this._extname = arg })
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string} */
        this._selectInnerHTML
        variables.filesInnerHTML.addListener(arg => {
            this._selectInnerHTML = arg
            this._operation()
        })
        this._operation = () => {
            fetch(`/attributes?path=${this._path}&extname=${this._extname}`).then(response => {
                response.json().then(data => {
                    const attributes = new Map(Object.entries(data))
                    variables.attributes.assign(attributes)

                    const allKeys = new Set()
                    attributes.forEach((/** @type {object}*/obj) => { Object.keys(obj).forEach(key => { allKeys.add(key) }) })
                    variables.visibleKeys.assign(Array.from(allKeys))
                    variables.visibleInnerHTML.assign(Array.from(allKeys).map(key => `<option selected>${key}</option>`).join(''))
                })
            })
        }
    }
}
