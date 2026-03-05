import imagesc from '../lib/imagesc.js'
import imwrite from '../lib/imwrite.js'

export default class {
    /**
     * @param {import('./FilteredImageVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {import('h5wasm').File} */
        this._hdf5File
        variables.hdf5File.addListener(arg => {
            this._hdf5File = arg
            this._operation()
        })
        this._operation = () => {
            /** @type {import('h5wasm').Dataset|null} */
            const filteredImage = this._hdf5File.get('filteredImage')
            if (!filteredImage) {
                variables.divInnerText.assign('missing filteredImage')
                return
            }
            console.log(filteredImage.shape)
            console.log(filteredImage.value)
            const startTime = Date.now()
            imwrite(imagesc({ numBins: filteredImage.shape, binCounts: filteredImage.value })).then(buffer => {
                console.log(`elapsedTime: ${Date.now()-startTime}ms`)
                variables.imageSrc.assign(`data:image/png;base64,${buffer.toString('base64')}`)
            })
            // variables.divInnerText.assign(Object.keys(this._hdf5File.attrs).map(key => {
            //     return `${key}: ${this._hdf5File.attrs[key].value}`
            // }).join('\n'))
        }
    }
}
