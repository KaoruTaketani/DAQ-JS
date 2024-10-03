import ListenableObject from './ListenableObject.js'

export default class extends ListenableObject {
    constructor(name, hdf5File) {
        super()
        this._name = name
        this._value
        hdf5File.addListener(arg => {
            if (this._value) {
                const dataset = arg.create_dataset({
                    name: this._name,
                    data: this._value.value,
                    dtype: '<i4'
                })
                dataset.create_attribute('lowerEdge', this._value.lowerEdge, null, '<f')
                dataset.create_attribute('upperEdge', this._value.upperEdge, null, '<f')
                dataset.create_attribute('numberOfBins', this._value.numberOfBins, null, '<i')
                dataset.create_attribute('underflowValue', this._value.underflowValue, null, '<i')
                dataset.create_attribute('overflowValue', this._value.overflowValue, null, '<i')
                dataset.create_attribute('toalValue', this._value.value.reduce((a, b) => a + b, 0), null, '<i')
            }
        })
    }
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}