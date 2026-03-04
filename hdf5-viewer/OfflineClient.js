import OfflineVariables from "./OfflineVariables.js";
import SelectChangeHandler from "./SelectChangeHandler.js";
import SelectDblclickHandler from "./SelectDblclickHandler.js";


const variables = new OfflineVariables()
new SelectDblclickHandler(variables)
new SelectChangeHandler(variables)

const selectElement = document.createElement('select');
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
})(document.body.appendChild(selectElement));
variables.selectElement.assign(selectElement);

(element => {
    element.style.marginLeft = '208px'
    variables.path.addListener(arg => {
        element.innerText = `path: ${arg}`
    })
})(document.body.appendChild(document.createElement('p')))

// const invisibleCanvasElement = document.createElement('canvas')
const imageElement = document.createElement('img')
imageElement.addEventListener('error', () => {
    console.log('image error')
    const ctx = canvasElement.getContext('2d')
    if (!ctx) throw new Error()

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
})
imageElement.addEventListener('load', () => {
    const ctx = canvasElement.getContext('2d')
    if (!ctx) throw new Error()

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height)
})

const divElement = document.body.appendChild(document.createElement('div'));
(element => {
    element.style.marginLeft = '208px'
})(divElement);
variables.divElement.assign(divElement);

const canvasElement = document.body.appendChild(document.createElement('canvas'));
(element => {
    element.style.marginLeft = '200px'
    element.width = 512
    element.height = 512
})(canvasElement);

// const params = new URLSearchParams(window.location.search)
// console.log(params.get('path'))
// let items = await fetch("/readdir?path=" + params.get('path'));
// items.text().then(data => {
//     // console.log(data)
//     selectElement.innerHTML = data
// }).catch(() => {
//     console.log('404')
//     document.body.innerHTML = '404'
// })
variables.path.addListener(arg => {
    fetch("/readdir?path=" + arg).then(response => {
        // 2. Check for HTTP error status codes (404, 500, etc.)
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            document.body.innerHTML = response.statusText
        } else {
            // 3. Process the response data if all is good
            response.text().then(text => { selectElement.innerHTML = text })
        }
    })
})

variables.path.assign('/')