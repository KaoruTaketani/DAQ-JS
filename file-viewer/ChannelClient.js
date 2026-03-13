import ChannelGetterGetter from "./ChannelGetter.js";
import ClientVariablesTable from "./ClientVariablesTable.js";
import FilePathMaker from "./FilePathMaker.js";
import FilesGetterEDR from "./FilesGetterEDR.js";
import NumEventsGetter from "./NumEventsGetter.js";
import SelectDblclickHandler from "./SelectDblclickHandler.js";
import TableCleanupper from "./TableCleanupper.js";

const variables = new ClientVariablesTable()
new SelectDblclickHandler(variables)
new ChannelGetterGetter(variables)
new NumEventsGetter(variables)
new FilesGetterEDR(variables)
new TableCleanupper(variables)
new FilePathMaker(variables)
    ;
/** @type {string} */
let _path
variables.path.addListener(arg => { _path = arg })
    ;
(element => {
    element.type = 'number'
    element.style.marginTop = '508px'
    element.style.position = 'absolute'
    element.min = '0'
    variables.offsetValue.addListener(arg => { element.value = arg })
    element.onchange = () => {
        const value = parseInt(element.value)
        if (!Number.isInteger(value)) return
        variables.offset.assign(value)
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.width = '150px'
    element.style.height = `500px`
    element.addEventListener('change', () => {
        variables.fileName.assign(element.options[element.selectedIndex].innerText)
    })
    variables.selectElement.assign(element) // used by dblclick
    variables.selectInnerHTML.addListener(arg => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

(element => {
    element.style.marginLeft = '158px'
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '158px'
    variables.tableInnerText.addListener(arg => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('table')));

variables.offset.assign(0)
variables.offsetValue.assign('0')
variables.path.assign('/')