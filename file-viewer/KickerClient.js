import KickerGetter from "./KickerGetter.js";
import ClientVariablesTable from "./ClientVariablesTable.js";
import FilePathMaker from "./FilePathMaker.js";
import FilesGetterEDR from "./FilesGetterEDR.js";
import NumEventsGetter from "./NumEventsGetter.js";
import PathMaker from "./PathMaker.js";
import TableCleanupper from "./TableCleanupper.js";

const variables = new ClientVariablesTable()
new PathMaker(variables)
new KickerGetter(variables)
new NumEventsGetter(variables)
new FilesGetterEDR(variables)
new TableCleanupper(variables)
new FilePathMaker(variables)
    ;
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.width = '200px'
    // element.style.height = `500px`
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.addEventListener('change', () => {
        variables.fileName.assign(element.options[element.selectedIndex].innerText)
    })
    element.addEventListener('dblclick', () => {
        variables.directoryName.assign(element.options[element.selectedIndex].innerText)
    })
    variables.selectInnerHTML.addListener(arg => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

(element => {
    // element.style.display = 'block'
    element.style.marginLeft = '208px'
    element.appendChild(document.createTextNode('offset: '));
    (element => {
        element.type = 'number'
        element.style.marginLeft = '8px'
        element.min = '0'
        element.addEventListener('change', () => {
            const value = parseInt(element.value)
            if (!Number.isInteger(value)) return
            variables.offset.assign(value)
        })
        variables.offsetValue.addListener(arg => { element.value = arg })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.marginLeft = '208px'
    variables.path.addListener(arg => { element.innerText = `path: ${arg}` })
})(document.body.appendChild(document.createElement('p')));

(element => {
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '208px'
    variables.tableInnerText.addListener(arg => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('table')));

variables.offset.assign(0)
variables.offsetValue.assign('0')
variables.path.assign('/')