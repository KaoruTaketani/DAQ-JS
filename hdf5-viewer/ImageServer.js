import HDF5FileNamesInnerHTMLMaker from './HDF5FileNamesInnerHTMLMaker.js'
import HDF5FileNamesReader from './HDF5FileNamesReader.js'
import ImageSender from './ImageSender.js'
import ServerVariables from './Variables.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        this.variables = new ServerVariables(webSocket)

        new HDF5FileNamesReader(this.variables)
        new HDF5FileNamesInnerHTMLMaker(this.variables)
        new ImageSender(this.variables)

        this.variables.hdf5Path.assign('../../hdf5/mieze')
    }
}

