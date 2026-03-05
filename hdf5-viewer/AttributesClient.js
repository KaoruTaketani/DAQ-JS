import OfflineDivInnerTextMaker from "./OfflineDivInnerTextMaker.js";
import OfflineVariables from "./OfflineVariables.js";
import SelectChangeHandler from "./SelectChangeHandler.js";
import SelectDblclickHandler from "./SelectDblclickHandler.js";
import SelectUpdater from "./SelectUpdater.js";

const variables = new OfflineVariables()
new SelectDblclickHandler(variables)
new SelectChangeHandler(variables)
new SelectUpdater(variables)
new OfflineDivInnerTextMaker(variables)
    ;
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
    variables.selectElement.assign(element)
})(document.body.appendChild(document.createElement('select')));

(element => {
    element.style.marginLeft = '208px'
    variables.path.addListener(arg => {
        element.innerText = `path: ${arg}`
    })
})(document.body.appendChild(document.createElement('p')))

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
});

(element => {
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => {
        element.innerText = arg
    })
})(document.body.appendChild(document.createElement('div')));

const canvasElement = document.body.appendChild(document.createElement('canvas'));
(element => {
    element.style.marginLeft = '200px'
    element.width = 512
    element.height = 512
})(canvasElement);

variables.path.assign('/')