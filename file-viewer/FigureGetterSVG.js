export default class {
    /**
     * @param {import('./FigureVariablesSVG.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {boolean} */
        this._customChecked
        variables.customChecked.prependListener(arg => { this._customChecked = arg })
        /** @type {string} */
        this._xminValue
        variables.xminValue.prependListener(arg => { this._xminValue = arg })
        /** @type {string} */
        this._xmaxValue
        variables.xmaxValue.prependListener(arg => { this._xmaxValue = arg })
        /** @type {string} */
        this._yminValue
        variables.yminValue.prependListener(arg => { this._yminValue = arg })
        /** @type {string} */
        this._ymaxValue
        variables.ymaxValue.prependListener(arg => { this._ymaxValue = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            // if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.h5')) return

            // @ts-ignore
            const pathname = window.pathname

            if (!this._customChecked) {
                fetch(`${pathname}?path=${this._path}&${this._fileNames.map(fileName=>`fileName=${fileName}`).join('&')}`).then(response => {
                    if (!response.ok) {
                        variables.divInnerText.assign('tofHistogram was not found')
                        variables.svgInnerHTML.assign('')
                    } else {
                        response.text().then(text => {
                            variables.divInnerText.assign('')
                            variables.svgInnerHTML.assign(text)
                        })
                    }
                }).catch(() => {
                    variables.divInnerText.assign('failed to get')
                    variables.svgInnerHTML.assign('')
                })
            } else {
                fetch(`${pathname}?path=${this._path}&${this._fileNames.map(fileName=>`fileName=${fileName}`).join('&')}&xLim=${this._xminValue}&xLim=${this._xmaxValue}&yLim=${this._yminValue}&yLim=${this._ymaxValue}`).then(response => {
                    if (!response.ok) {
                        variables.divInnerText.assign('tofHistogram was not found')
                        variables.svgInnerHTML.assign('')
                    } else {
                        response.text().then(text => {
                            variables.divInnerText.assign('')
                            variables.svgInnerHTML.assign(text)
                        })
                    }
                }).catch(() => {
                    variables.divInnerText.assign('failed to get')
                    variables.svgInnerHTML.assign('')
                })
            }
        }
    }
}
