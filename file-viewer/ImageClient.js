import ClientVariablesImage from "./ClientVariablesImage.js";
import FilePathMaker from "./FilePathMaker.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import ImageGetter from "./ImageGetter.js";
import ImageCleanupper from "./ImageCleanupper.js";
import PathMaker from "./PathMaker.js";
import ImageDrawer from "./ImageDrawer.js";
import CursorTextMaker from "./CursorTextMaker.js";

const variables = new ClientVariablesImage()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new FilePathMaker(variables)
new ImageCleanupper(variables)
new ImageGetter(variables)
new ImageDrawer(variables)
new CursorTextMaker(variables)
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
    variables.path.addListener(arg => { element.innerText = `path: ${arg}` })
})(document.body.appendChild(document.createElement('p')));

(element => {
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => {
        element.innerText = arg
    })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '200px'
    element.style.marginTop = '50px'
    element.style.position = 'absolute'
    // element.style.top='0'
    // element.style.left='0'
    element.width = 400
    element.height = 300

    const ctx = element.getContext('2d')
    if (!ctx) throw new Error()

    ctx.imageSmoothingEnabled = false
    variables.canvasContext.assign(ctx)
})(document.body.appendChild(document.createElement('canvas')));

(element => {
    variables.imageSrc.addListener(arg => {
        element.src = arg
    })
    element.addEventListener('load', () => {
        variables.imageElement.assign(element)
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
    element.addEventListener('mousemove', ev => {
        variables.cursorOffset.assign([ev.offsetX, ev.offsetY])
    })
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg

        const axes =/** @type {HTMLElement} */(element.firstElementChild)
        // console.log(`x: [${axes.dataset.xminInPixels}, ${axes.dataset.xmaxInPixels}], y: [${axes.dataset.yminInPixels}, ${axes.dataset.ymaxInPixels}]`)
        if (axes.dataset.xminInPixels)
            variables.xminInPixels.assign(parseInt(axes.dataset.xminInPixels))
        if (axes.dataset.yminInPixels)
            variables.yminInPixels.assign(parseInt(axes.dataset.yminInPixels))
        if (axes.dataset.xmaxInPixels)
            variables.xmaxInPixels.assign(parseInt(axes.dataset.xmaxInPixels))
        if (axes.dataset.ymaxInPixels)
            variables.ymaxInPixels.assign(parseInt(axes.dataset.ymaxInPixels))
        if (axes.dataset.xminInData)
            variables.xminInData.assign(parseFloat(axes.dataset.xminInData))
        if (axes.dataset.yminInData)
            variables.yminInData.assign(parseInt(axes.dataset.yminInData))
        if (axes.dataset.xmaxInData)
            variables.xmaxInData.assign(parseInt(axes.dataset.xmaxInData))
        if (axes.dataset.ymaxInData)
            variables.ymaxInData.assign(parseInt(axes.dataset.ymaxInData))
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.path.assign('/')