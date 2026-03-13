export default class {
    /**
     * @param {import('./ClientVariablesImage.js').default} variables 
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
                    variables.imageSrc.assign('')
                    return
                }
                if (!filename.endsWith('.h5')) return

                const filePath = this._path === '/' ? `/${filename}` : `${this._path}/${filename}`

                fetch(`${filePath}?type=svg&path=/filteredImage`).then(response => {
                    if (!response.ok) {
                        variables.divInnerText.assign('filteredImage was not found')
                        variables.svgInnerHTML.assign('')
                        variables.imageSrc.assign('')
                    } else {
                        response.text().then(text => {
                            variables.divInnerText.assign('')
                            variables.svgInnerHTML.assign(text)
                            fetch(`${filePath}?type=png&path=/filteredImage`).then(response => {
                                response.text().then(text => {
                                    variables.imageSrc.assign(text)
                                })
                            })
                        })
                    }
                })
            })
        }
    }
}
