import bounds from '../lib/bounds.js'

export default class {
    /**
     * @param {import('./WaveformVariables.js').default} variables 
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
        /** @type {string} */
        this._keyText
        variables.keyText.addListener(arg => {
            this._keyText = arg
            this._operation()
        })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._keyText) return
            if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.h5')) return

            fetch(`/waveform?key=${this._keyText}&path=${this._path}&fileName=${this._fileNames[0]}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign(`${this._keyText} was not found in ${this._fileNames[0]}`)
                    variables.svgInnerHTML.assign('')
                } else {
                    response.text().then(text => {
                        const data = JSON.parse(text)

                        variables.divInnerText.assign('')
                        variables.xlabel.assign(data.xlabel)
                        variables.xDataset.assign(data.x)
                        variables.yDataset.assign(data.y)
                        const xlim = bounds(data.x)
                        variables.xminValue.assign(xlim[0].toString())
                        variables.xmaxValue.assign(xlim[1].toString())
                        const ylim = bounds(data.y)
                        variables.yminValue.assign(ylim[0].toString())
                        variables.ymaxValue.assign(ylim[1].toString())
                    })
                }
            }).catch(() => {
                variables.divInnerText.assign('failed to get')
                variables.svgInnerHTML.assign('')
            })
        }
    }
}
