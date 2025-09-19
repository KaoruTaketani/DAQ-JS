import OfflineHDF5FileNamesInnerHTMLMaker from './OfflineHDF5FileNamesInnerHTMLMaker.js'
import OfflineHDF5FileNamesReader from './OfflineHDF5FileNamesReader.js'
import OfflineReader from './OfflineReader.js'
import OfflineVariables from './OfflineVariables.js'

export default class {
    /**
     * @param {Map<string,string>} elementVariables
     */
    constructor(elementVariables) {
        this.variables = new OfflineVariables()
        new OfflineHDF5FileNamesReader(this.variables)
        new OfflineHDF5FileNamesInnerHTMLMaker(this.variables)
        new OfflineReader(this.variables)

        this.variables.elementVariables.assign(elementVariables)
        this.variables.hdf5Path.assign('../../hdf5/mieze')
    }
}

