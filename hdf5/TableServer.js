import HDF5AttributesInnerHTMLMaker from './HDF5AttributesInnerHTMLMaker.js'
import HDF5AttributesReader from './HDF5AttributesReader.js'
import HDF5FileNamesReader from './HDF5FileNamesReader.js'
import ServerVariables from './Variables.js'
import TableSender from './TableSender.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        this.variables = new ServerVariables(webSocket)

        new HDF5FileNamesReader(this.variables)
        new HDF5AttributesReader(this.variables)
        new HDF5AttributesInnerHTMLMaker(this.variables)
        new TableSender(this.variables)

        this.variables.hdf5Path.assign('../../hdf5/mieze')
    }
}

