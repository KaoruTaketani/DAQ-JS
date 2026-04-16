export default class {
    /**
     * @param {import('./FigureVariablesSVG').default} variables 
     */
    constructor(variables) {
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileNames.length !== 1) return

            if (this._fileNames[0].endsWith('/'))
                variables.svgInnerHTML.assign('')
        }
    }
}
