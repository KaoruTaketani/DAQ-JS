import ChannelGetterGetter from "./ChannelGetter.js";
import ClientTableVariables from "./ClientTableVariables.js";
import FilesGetterEDR from "./FilesGetterEDR.js";
import NumEventsGetter from "./NumEventsGetter.js";
import SelectDblclickHandler from "./SelectDblclickHandler.js";

const variables = new ClientTableVariables()
new SelectDblclickHandler(variables)
new ChannelGetterGetter(variables)
new NumEventsGetter(variables)
new FilesGetterEDR(variables)
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
        const filename = element.options[element.selectedIndex].innerText
        if (filename.endsWith('/')) {
            variables.divInnerText.assign('')
            return
        }
        if (!filename.endsWith('.edr')) return

        variables.offset.assign(0)
        variables.offsetValue.assign('0')
        variables.filePath.assign(_path === '/' ? `/${filename}` : `${_path}/${filename}`)
    })
    variables.selectElement.assign(element)
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