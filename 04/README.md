[home](../README.md)

"setInterval() method ... repeatedly calls a function... with a fixed time delay between each call"

By runnging the sample code, a number is shown in the browser. The number changes by reloading.

### before
index.js:
```js
const randomNumber = Math.random()
```

### after
index.js: 
```js
let randomNumber
setInterval(() => {
    randomNumber = Math.random()
}, 1000)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `node .` in the terminal
1. open http://localhost in your browser