import FilteredImageGetter from "./FilteredImageGetter.js";
import FilteredImageVariables from "./FilteredImageVariables.js";
import SelectDblclickHandler from "./SelectDblclickHandler.js";
import FilesGetter from "./FilesGetter.js";

const variables = new FilteredImageVariables()
new SelectDblclickHandler(variables)
new FilesGetter(variables)
new FilteredImageGetter(variables)
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
})(document.body.appendChild(document.createElement('p')));

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

(element => {
    variables.imageSrc.addListener(arg => {
        element.src = arg
    })
    element.addEventListener('error', () => {
        console.log('image error')
        const ctx = canvasElement.getContext('2d')
        if (!ctx) throw new Error()

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    });
    element.addEventListener('load', () => {
        const ctx = canvasElement.getContext('2d')
        if (!ctx) throw new Error()

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(element, 0, 0, canvasElement.width, canvasElement.height)
    });
})(document.createElement('img'));

variables.path.assign('/')