[home](../README.md)

Client.js:
```js
(element => {
    const linkElement = document.createElement('a')

    let svgInnerHTML
    url.pathname = 'histogramSVGInnerHTML'
    const svgInnerHTMLSocket = new WebSocket(url)
    svgInnerHTMLSocket.onmessage = event => {
        svgInnerHTML = event.data
    }

    element.type = 'button'
    element.value = 'download svg'
    element.style.width = '130px'
    
    element.onclick = () => {
        linkElement.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" >${svgInnerHTML}</svg>`
        ))
        linkElement.setAttribute('download', 'histogram.svg')
        linkElement.click()
    }
})(document.body.appendChild(document.createElement('input')));
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