Client.js:
```js
(element => {
    element.setAttribute('width', '400')
    element.setAttribute('height', '300');

    const overlayElement = element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));

    (element => {
        element.setAttribute('width', '400')
        element.setAttribute('height', '300');
        (element => {
            ...
            element.onmousemove = ev => {
                ...
                overlayElement.innerHTML = `<polyline points="${ev.offsetX},0 ${ev.offsetX},420" stroke="red" fill="none"></polyline>`
            }
        })(element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
    })(element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')));
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser