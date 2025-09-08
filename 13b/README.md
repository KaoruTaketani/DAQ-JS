[home](../README.md)

Client.js:
```js
const downloadHDF5ButtonElement = document.createElement('input')
downloadHDF5ButtonElement.type = 'button'
downloadHDF5ButtonElement.value = 'download hdf5'
downloadHDF5ButtonElement.style.width = '130px'
downloadHDF5ButtonElement.style.display = 'block'
dialogElement.appendChild(downloadHDF5ButtonElement)

const hdf5LinkElement = document.createElement('a')
url.pathname = 'hdf5LinkHref'
const hdf5LinkHrefSocket = new WebSocket(url)
hdf5LinkHrefSocket.onmessage = event => {
    hdf5LinkElement.href = event.data
}
downloadHDF5ButtonElement.onclick = () => {
    hdf5LinkElement.setAttribute('download', 'histogram.h5')
    hdf5LinkElement.click()
}
```

WritableFloat.js:
```js
export default class extends ListenableObject {
    constructor(name, hdf5File) {
        super()
        this._name = name
        this._value
        hdf5File.addListener(arg => {
            arg.create_attribute(this._name, this._value, null, '<f')
        })
    }
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}
```

WritableHistogram.js:
```js
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
        })
    }
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser
1. click start button
1. double click histogram
1. click download hdf5 button