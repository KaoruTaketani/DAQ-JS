export default class {
    /**
     * @param {import('./WaveformArrayVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string[]} */
        this._fileNames
        variables.fileNames.addListener(arg => {
            this._fileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._fileNames.length !== 1) return
            if (!this._fileNames[0].endsWith('.sigb')) {
                variables.divInnerText.assign('')
                return
            }

            fetch(`/numWaveforms?path=${this._path}&fileName=${this._fileNames[0]}`).then(response => {
                if (!response.ok) {
                    variables.divInnerText.assign('failed numEvents')
                } else {
                    response.text().then(text => {
                        console.log(text)
                        variables.numWaveformsInnerText.assign(text)
                    })
                }
            })
        }
    }
}
