import ControllableBoolean from '../13/ControllableBoolean.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import WritableHistogram from './WritableHistogram.js'
import WritableFloat from './WritableFloat.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()
        this.histogramHDF5File = new ListenableObject()
        this.histogram = new WritableHistogram('histogram', this.histogramHDF5File)
        this.timeSeries = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.startButtonDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.histogramBinLimitsMin = new WritableFloat('histogramBinLimitsMin', this.histogramHDF5File)
        this.histogramBinLimitsMax = new WritableFloat('histogramBinLimitsMax', this.histogramHDF5File)

        this.randomNumberInnerText = new ElementString('/randomNumberInnerText', this.elementValues, this.webSocketPathnames)
        this.startTimeInnerText = new ElementString('/startTimeInnerText', this.elementValues, this.webSocketPathnames)
        this.histogramSVGInnerHTML = new ElementString('/histogramSVGInnerHTML', this.elementValues, this.webSocketPathnames)
        this.timeSeriesSVGInnerHTML = new ElementString('/timeSeriesSVGInnerHTML', this.elementValues, this.webSocketPathnames)
        this.hdf5LinkHref = new ElementString('/hdf5LinkHref', this.elementValues, this.webSocketPathnames)
    }
}

