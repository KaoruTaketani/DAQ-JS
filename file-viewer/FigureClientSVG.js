import FigureCleanupperSVG from "./FigureCleanupperSVG.js";
import FigureGetterSVG from "./FigureGetterSVG.js";
import FigureVariablesSVG from "./FigureVariablesSVG.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import PathMaker from "./PathMaker.js";

const variables = new FigureVariablesSVG()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new FigureCleanupperSVG(variables)
new FigureGetterSVG(variables)
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
    element.appendChild(document.createTextNode('custom? '));
    (element => {
        // element.style.marginLeft = '208px'
        element.type = 'checkbox'
        // element.checked = true
        element.addEventListener('click', () => {
            xminElement.disabled = !element.checked
            xmaxElement.disabled = !element.checked
            yminElement.disabled = !element.checked
            ymaxElement.disabled = !element.checked
        })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('label')));

const xminElement = document.createElement('input');
(element => {
    element.style.marginLeft = '8px'
    element.appendChild(document.createTextNode('xmin'));
    (element => {
        // element.type = 'number'
        element.style.marginLeft = '8px'
        element.disabled = true
        // element.min = '0'
        // element.addEventListener('change', () => {
        //     const value = parseInt(element.value)
        //     if (!Number.isInteger(value)) return
        //     variables.offset.assign(value)
        // })
        // variables.offsetValue.addListener(arg => { element.value = arg })
    })(element.appendChild(xminElement));
})(document.body.appendChild(document.createElement('label')));

const xmaxElement = document.createElement('input');
(element => {
    element.style.marginLeft = '8px'
    element.appendChild(document.createTextNode('xmax'));
    (element => {
        // element.type = 'number'
        element.style.marginLeft = '8px'
        element.disabled = true
        // element.min = '0'
        // element.addEventListener('change', () => {
        //     const value = parseInt(element.value)
        //     if (!Number.isInteger(value)) return
        //     variables.offset.assign(value)
        // })
        // variables.offsetValue.addListener(arg => { element.value = arg })
    })(element.appendChild(xmaxElement));
})(document.body.appendChild(document.createElement('label')));

const yminElement = document.createElement('input');
(element => {
    element.style.marginLeft = '8px'
    element.appendChild(document.createTextNode('ymin'));
    (element => {
        // element.type = 'number'
        element.style.marginLeft = '8px'
        element.disabled = true
        // element.min = '0'
        // element.addEventListener('change', () => {
        //     const value = parseInt(element.value)
        //     if (!Number.isInteger(value)) return
        //     variables.offset.assign(value)
        // })
        // variables.offsetValue.addListener(arg => { element.value = arg })
    })(element.appendChild(yminElement));
})(document.body.appendChild(document.createElement('label')));

const ymaxElement = document.createElement('input');
(element => {
    element.style.marginLeft = '8px'
    element.appendChild(document.createTextNode('ymax'));
    (element => {
        // element.type = 'number'
        element.style.marginLeft = '8px'
        element.disabled = true
        // element.min = '0'
        // element.addEventListener('change', () => {
        //     const value = parseInt(element.value)
        //     if (!Number.isInteger(value)) return
        //     variables.offset.assign(value)
        // })
        // variables.offsetValue.addListener(arg => { element.value = arg })
    })(element.appendChild(ymaxElement));
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '208px'
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg

        const axes =/** @type {HTMLElement} */(element.firstElementChild)
        // console.log(`x: [${axes.dataset.xminInPixels}, ${axes.dataset.xmaxInPixels}], y: [${axes.dataset.yminInPixels}, ${axes.dataset.ymaxInPixels}]`)
        if (axes.dataset.xminInData) xminElement.value = axes.dataset.xminInData
        if (axes.dataset.xmaxInData) xmaxElement.value = axes.dataset.xmaxInData
        if (axes.dataset.yminInData) yminElement.value = axes.dataset.yminInData
        if (axes.dataset.ymaxInData) ymaxElement.value = axes.dataset.ymaxInData

    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.path.assign('/')