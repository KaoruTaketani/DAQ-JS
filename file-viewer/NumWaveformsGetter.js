export default class {
    /**
     * @param {import('./WaveformVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {string[]} */
        this._selectedFileNames
        variables.selectedFileNames.addListener(arg => {
            this._selectedFileNames = arg
            this._operation()
        })
        this._operation = () => {
            if (this._selectedFileNames.length !== 1) return
            if (!this._selectedFileNames[0].endsWith('.sigb')) {
                variables.divInnerText.assign('')
                return
            }

            fetch(`/numWaveforms?path=${this._path}&fileName=${this._selectedFileNames[0]}`).then(response => {
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
