import CursorTextMaker from "./CursorTextMaker.js";
import FigureGetterPNG from "./FigureGetterPNG.js";
import FigureVariablesPNG from "./FigureVariablesPNG.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import FigureCleanupperPNG from "./FigureCleanupperPNG.js";
import PNGDrawer from "./PNGDrawer.js";
import PathMaker from "./PathMaker.js";

const variables = new FigureVariablesPNG()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new FigureCleanupperPNG(variables)
new PNGDrawer(variables)
new FigureGetterPNG(variables)
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

const linkElement = document.createElement('a');
const canvasElement = document.createElement('canvas')
/** @type {string} */
let svgInnerHTML
(element => {
    linkElement.setAttribute('download', `image.svg`)

    element.style.marginLeft = '208px'
    element.type = 'button'
    element.value = 'download'
    element.addEventListener('click', () => {
        // const header = Array.from(tHead.rows[0].cells)
        //     .filter(cell => cell.style.display === '')
        //     .map(cell => cell.innerText)
        //     .join(',')
        // const data = Array.from(tBody.rows)
        //     .map(row => Array.from(row.cells)
        //         .filter(cell => cell.style.display === '')
        //         .map(cell => cell.innerText.split(',').join('')).join(',')
        //     ).join('\n')
        // const buffer = new Buffer([header, data].join('\n'), 'utf-8')
        // linkElement.href = `data:text/csv;base64,${buffer.toString('base64')}`
        linkElement.href = `data:image/svg+xml;base64,${btoa([
            '<svg xmlns="http://www.w3.org/2000/svg" >',
            svgInnerHTML,
            // `<image width="400" height="300" href="${canvasElement.toDataURL()}" />`,
            `<image width="560" height="420" href="${canvasElement.toDataURL()}" />`,
            '</svg>'
        ].join(''))}`
        linkElement.click()
    })
})(document.body.appendChild(document.createElement('input')));

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
})(document.body.appendChild(canvasElement));

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
        svgInnerHTML = arg

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

// @ts-ignore
console.log(window.pathname)