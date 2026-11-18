BatchParamsMaker.js:
```js
const args = this._batchParamsMakerInput.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(':').map(word=>word.trim()))

variables.batchParams.assign(new URLSearchParams(args))
```

TextAreaValueChanger.js:
```js
let tmp = ''
this._batchParams.forEach((value, key) => {
    tmp += `${key}: ${value}\n`
})
variables.textAreaValue.assign(tmp)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser
1. click start button
