export default class {
    /**
     * @param {import('./ClientVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {HTMLSelectElement} */
        this._selectElement
        variables.selectElement.addListener(arg => {
            this._selectElement = arg
            this._operation()
        })
        this._operation = () => {
            this._selectElement.addEventListener('dblclick', () => {
                const filename = this._selectElement.options[this._selectElement.selectedIndex].innerText
                console.log(`dblclick ${filename}`)
                if (!filename.endsWith('/')) return

                if (filename === '../') {
                    const newPath = this._path.substring(0, this._path.lastIndexOf('/'))
                    variables.path.assign(newPath === '' ? '/' : newPath)
                } else {
                    const newPath = (this._path === '/' ? '' : this._path) + '/' + filename.substring(0, filename.length - 1)
                    variables.path.assign(newPath)
                }
            })
        }
    }
}
