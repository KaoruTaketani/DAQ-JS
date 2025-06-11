[home](../README.md)

Client.js:
```js
const hdf5LinkElement = document.createElement('a')
const downloadHDF5ButtonElement = document.createElement('input')
downloadHDF5ButtonElement.type = 'button'
downloadHDF5ButtonElement.value = 'download hdf5'
downloadHDF5ButtonElement.style.width = '130px'
downloadHDF5ButtonElement.style.display = 'block'
downloadHDF5ButtonElement.onclick = () => {
    const url = new URL(import.meta.url)
    hdf5LinkElement.setAttribute('href', `${url.origin}/histogram.h5`)
    hdf5LinkElement.click()
}
dialogElement.appendChild(downloadHDF5ButtonElement)
```

HTTPRequestHandler.js:
```js
import { File, ready } from 'h5wasm/node'

if (request.url === '/histogram.h5') {
    ready.then(() => {
        const file = new File('./histogram.h5', 'w')
        variables.histogramHDF5File.assign(file)
        file.close()

        readFile('./histogram.h5',(err,data)=>{
                if(err) throw err

                response.end(data)
            })
        })
    return
}
```

WritableHistogram.js:
```js
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
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser