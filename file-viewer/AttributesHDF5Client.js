import AttributesDrawer from "./AttributesDrawer.js";
import AttributesGetter from "./AttributesGetter.js";
import AttributesVariables from "./AttributesVariables.js";
import FilesGetter from "./FilesGetter.js";
import PathMaker from "./PathMaker.js";

const variables = new AttributesVariables()
new PathMaker(variables)
new AttributesGetter(variables)
new AttributesDrawer(variables)
new FilesGetter(variables)
    ;
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.multiple = true
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
    element.addEventListener('change', () => {
        variables.fileNames.assign(Array.from(element.selectedOptions).map(option => option.innerText))
    })
    element.addEventListener('dblclick', () => {
        variables.directoryName.assign(element.options[element.selectedIndex].innerText)
    })
    variables.selectInnerHTML.addListener(arg => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

(element => {
    const dialogElement = document.body.appendChild(document.createElement('dialog'))
    element.style.marginLeft = '208px'
    element.type = 'button'
    element.value = 'visible'
    element.addEventListener('click', () => { dialogElement.showModal() });

    (element => {
        element.size = 20
        element.style.width = '200px'
        element.style.display = 'flex'
        element.style.justifyContent = 'center'
        element.multiple = true

        element.addEventListener('change', () => {
            variables.visibleKeys.assign(Array.from(element.selectedOptions).map(option => option.innerText))
        })
        variables.visibleInnerHTML.addListener(arg => { element.innerHTML = arg })
    })(dialogElement.appendChild(document.createElement('select')));
    (element => {
        element.type = 'button'
        element.value = 'close'
        element.style.display = 'flex'
        element.style.width = '200px'
        element.style.marginTop = '10px'

        element.addEventListener('click', () => { dialogElement.close() })
    })(dialogElement.appendChild(document.createElement('input')));

})(document.body.appendChild(document.createElement('input')));

(element => {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('download', `table.csv`)
    variables.linkHref.addListener(arg => { linkElement.href = arg })

    element.type = 'button'
    element.value = 'download'

    element.addEventListener('click', () => {
        linkElement.click()
    })
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.style.display = 'inline-block'
    variables.path.addListener(arg => { element.innerText = `path: ${arg}` })
})(document.body.appendChild(document.createElement('p')));

(element => {
    element.style.marginLeft = '208px';
    (element => {
        element.style.top = '0'
        element.style.position = 'sticky'
        element.style.backgroundColor = 'white'

        variables.theadInnerHTML.addListener(arg => { element.innerHTML = arg })
    })(element.appendChild(document.createElement('thead')));
    (element => {
        variables.tbodyInnerHTML.addListener(arg => { element.innerHTML = arg })
    })(element.appendChild(document.createElement('tbody')))
})(document.body.appendChild(document.createElement('table')));

variables.extname.assign('h5')
variables.path.assign('/')

