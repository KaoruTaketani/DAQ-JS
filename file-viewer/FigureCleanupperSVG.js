export default class {
    /**
     * @param {import('./FigureVariablesSVG').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._fileName
        variables.fileName.addListener(arg => {
            this._fileName = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileName.endsWith('/'))
                variables.svgInnerHTML.assign('')
        }
    }
}
