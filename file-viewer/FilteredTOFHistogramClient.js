import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import FilteredTOFHistogramGetter from "./FilteredTOFHistogramGetter.js";
import ClientImageVariables from "./ClientImageVariables.js";
import SelectDblclickHandler from "./SelectDblclickHandler.js";

const variables = new ClientImageVariables()
new SelectDblclickHandler(variables)
new FilesGetterHDF5(variables)
new FilteredTOFHistogramGetter(variables)
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

(element => {
    element.style.marginLeft = '208px'
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox','0 0 560 420')
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.path.assign('/')