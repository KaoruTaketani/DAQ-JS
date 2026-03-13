import ClientVariablesImage from "./ClientVariablesImage.js";
import FilePathMaker from "./FilePathMaker.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import FilteredImageGetter from "./FilteredImageGetter.js";
import ImageCleanupper from "./ImageCleanupper.js";
import PathMaker from "./PathMaker.js";

const variables = new ClientVariablesImage()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new FilePathMaker(variables)
new ImageCleanupper(variables)
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
    element.addEventListener('change', () => {
        variables.fileName.assign(element.options[element.selectedIndex].innerText)
    })
    element.addEventListener('dblclick', () => {
        variables.directoryName.assign(element.options[element.selectedIndex].innerText)
    })
    variables.selectInnerHTML.addListener(arg => { element.innerHTML = arg })
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
    element.style.marginTop = '50px'
    element.style.position = 'absolute'
    // element.style.top='0'
    // element.style.left='0'
    element.width = 400
    element.height = 300
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
        // ctx.drawImage(element, 0, 0, canvasElement.width, canvasElement.height)
        // ctx.drawImage(element, 0, 0)
        // x:[73, 503], y: [374,32] can be obtained from axes.dataset.xMinInPixels
        // ctx.drawImage(element, 73 * 400/560, 32 * 300/420)
        ctx.drawImage(element, 73 * 400 / 560, 32 * 300 / 420, (503 - 73) * 400 / 560, (374 - 32) * 300 / 420)
    });
})(document.createElement('img'));

(element => {
    element.style.marginLeft = '200px'
    element.style.marginTop = '50px'
    element.style.position = 'absolute'
    // element.style.top='0'
    // element.style.left='0'
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg

        const axes = element.firstChild
        if (!axes) return
        console.log(`x: [${axes.dataset.xminInPixels}, ${axes.dataset.xmaxInPixels}], y: [${axes.dataset.yminInPixels}, ${axes.dataset.ymaxInPixels}]`)
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.path.assign('/')