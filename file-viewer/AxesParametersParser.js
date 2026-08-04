export default class {
    /**
     * @param {import('./SVGVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {HTMLElement} */
        this._axesElement
        variables.axesElement.addListener(arg => {
            this._axesElement = arg
            this._operation()
        })
        this._operation = () => {
            if (this._axesElement === null) return

            const dataset = this._axesElement.dataset
            if (dataset.xminInPixels)
                variables.xminInPixels.assign(parseInt(dataset.xminInPixels))
            if (dataset.yminInPixels)
                variables.yminInPixels.assign(parseInt(dataset.yminInPixels))
            if (dataset.xmaxInPixels)
                variables.xmaxInPixels.assign(parseInt(dataset.xmaxInPixels))
            if (dataset.ymaxInPixels)
                variables.ymaxInPixels.assign(parseInt(dataset.ymaxInPixels))
            if (dataset.xminInData)
                variables.xminInData.assign(parseFloat(dataset.xminInData))
            if (dataset.yminInData)
                variables.yminInData.assign(parseInt(dataset.yminInData))
            if (dataset.xmaxInData)
                variables.xmaxInData.assign(parseInt(dataset.xmaxInData))
            if (dataset.ymaxInData)
                variables.ymaxInData.assign(parseInt(dataset.ymaxInData))

        }
    }
}
