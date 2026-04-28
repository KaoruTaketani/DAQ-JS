export default class {
    /**
     * @param {import('./FigureVariablesPNG.js').default} variables 
     */
    constructor(variables) {
        /** @type {boolean} */
        this._customChecked
        variables.customChecked.prependListener(arg => { this._customChecked = arg })
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
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
            if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.h5')) return

            // @ts-ignore
            const pathname = window.pathname

            fetch(`${pathname}?path=${this._path}&fileName=${this._fileNames[0]}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('raw image was not found')
                    variables.svgInnerHTML.assign('')
                    variables.imageSrc.assign('')
                } else {
                    response.text().then(text => {
                        variables.divInnerText.assign('')
                        const data = JSON.parse(text)

                        variables.pngXMinInMillimeters.assign(data.xLimInMillimeters[0])
                        variables.pngXMaxInMillimeters.assign(data.xLimInMillimeters[1])
                        variables.pngYMinInMillimeters.assign(data.yLimInMillimeters[0])
                        variables.pngYMaxInMillimeters.assign(data.yLimInMillimeters[1])
                        variables.xminValue.assign(data.xLimInMillimeters[0].toString())
                        variables.xmaxValue.assign(data.xLimInMillimeters[1].toString())
                        variables.yminValue.assign(data.yLimInMillimeters[0].toString())
                        variables.ymaxValue.assign(data.yLimInMillimeters[1].toString())
                        variables.imageSrc.assign(data.imageSrc)
                    })
                }
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.svgInnerHTML.assign('')
                variables.imageSrc.assign('')
            })
        }
    }
}

