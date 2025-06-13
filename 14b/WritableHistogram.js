import ListenableObject from '../14/ListenableObject.js'

export default class extends ListenableObject {
    constructor(name, hdf5File) {
        super()
        this._name = name
        this._value
        hdf5File.addListener(arg => {
            const dataset = arg.create_dataset({
                name: this._name,
                data: this._value.binCounts,
                dtype: '<i'
            })
        })
    }
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}