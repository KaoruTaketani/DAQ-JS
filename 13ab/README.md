[home](../README.md)

Client.js:
```js
(element => {
    element.type = 'button'
    element.value = 'download hdf5'
    element.style.width = '130px'
    const linkElement = document.createElement('a')
    url.pathname = 'hdf5LinkHref'
    const hrefSocket = new WebSocket(url)
    hrefSocket.onmessage = event => {
        linkElement.href = event.data
    }
    element.onclick = () => {
        linkElement.setAttribute('download', 'histogram.h5')
        linkElement.click()
    }
})(document.body.appendChild(document.createElement('input')));
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