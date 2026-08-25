export default class {
    /**
     * @param {import('./AttributesVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {HTMLTableElement} */
        this._tableElement
        variables.tableElement.prependListener(arg => { this._tableElement = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            // ''.split(',').length is 1
            if (this._fileNames.length === 0) {
                this._tableElement.innerHTML = ''
                // variables.tableInnerHTML.assign('')
                return
            }
            const jsonFileNames = this._fileNames.filter(fileName => fileName.endsWith('.json'))
            if (jsonFileNames.length === 0) return
            
            fetch(`/objects?path=${this._path}&${jsonFileNames.map(fileName => `fileName=${fileName}`).join('&')}`).then(response => {
                response.text().then(text => {
                    // variables.tableInnerHTML.assign(text)
                    this._tableElement.innerHTML = text

                    variables.tHeadElement.assign(this._tableElement.tHead)
                    variables.tBodyElement.assign(this._tableElement.tBodies[0])

                    if (!this._tableElement.tHead) return

                    this._tableElement.tHead.style.top = '0'
                    this._tableElement.tHead.style.position = 'sticky'
                    this._tableElement.tHead.style.backgroundColor = 'white'

                    const visibleInnerHTML = Array.from(this._tableElement.tHead.rows[0].cells)
                        .filter(cell => cell.innerText !== '_name')
                        .map(cell => `<option selected>${cell.innerText}</option>`).join('')
                    variables.visibleInnerHTML.assign(visibleInnerHTML)

                })
            })
        }
    }
}
