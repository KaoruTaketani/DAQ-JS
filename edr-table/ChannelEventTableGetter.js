export default class {
    /**
     * @param {import('./ChannelEventVariables.js').default} variables 
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
            this._selectElement.addEventListener('change', () => {
                const filename = this._selectElement.options[this._selectElement.selectedIndex].innerText
                if (filename.endsWith('/')) {
                    variables.divInnerText.assign('')
                    return
                }
                if (!filename.endsWith('.edr')) return

                const filePath = this._path === '/' ? `/${filename}` : `${this._path}/${filename}`

                fetch(`${filePath}?type=channel&offset=0`).then(response => {
                    response.text().then(text => {
                        variables.tableInnerText.assign(text)
                    })
                })
            })
        }
    }
}
