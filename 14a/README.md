[home](../README.md)

Client.js:
```js
const svgLinkElement = document.createElement('a')

const downloadSVGButtonElement = document.createElement('input')

downloadSVGButtonElement.onclick = () => {
    svgLinkElement.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(
        `<svg xmlns="http://www.w3.org/2000/svg" >${histogramSVGElement.innerHTML}</svg>`
    ))
    svgLinkElement.setAttribute('download', 'histogram.svg')
    svgLinkElement.click()
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
1. click download svg button