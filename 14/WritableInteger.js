import ListenableObject from './ListenableObject.js'

export default class extends ListenableObject {
    constructor(name, hdf5File) {
        super()
        this._name = name
        this._value
        hdf5File.addListener(arg => {
            arg.create_attribute(this._name, this._value, null, '<i')
        })
    }
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}