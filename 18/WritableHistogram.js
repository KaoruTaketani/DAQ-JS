import ListenableObject from './ListenableObject.js'

export default class extends ListenableObject {
    constructor(name, hdf5File) {
        super()
        this._name = name
        this._value
        hdf5File.addListener(arg => {
            const dataset = arg.create_dataset({
                name: this._name,
                data: this._value.binCounts,
                dtype: '<i4'
            })
            dataset.create_attribute('binLimitsMin', this._value.binLimits[0], null, '<f')
            dataset.create_attribute('binLimitsMax', this._value.binLimits[1], null, '<f')
        })
    }
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}