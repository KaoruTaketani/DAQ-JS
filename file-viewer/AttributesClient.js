import AttributesGetter from "./AttributesGetter.js";
import ClientVariablesAttributes from "./ClientVariablesAttributes.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import PathMaker from "./PathMaker.js";

const variables = new ClientVariablesAttributes()
new PathMaker(variables)
new AttributesGetter(variables)
new FilesGetterHDF5(variables)
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
        variables.fileName.assign(Array.from(element.selectedOptions).map(option => option.innerText).filter(text => text.endsWith('.h5')).join(','))
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

const dialogElement = document.createElement('dialog');
(element => {
    (element => {
        element.size = 20
        element.style.width = '200px'
        element.multiple = true
        element.addEventListener('change', () => {
            const selectedIndexes = Array.from(element.selectedOptions).map(option => option.index)
            console.log(selectedIndexes)
            Array.from(tHead.rows[0].cells).forEach((cell, i) => {
                if (i === 0) return
                cell.style.display = selectedIndexes.includes(i - 1) ? '' : 'none'
            })
        })
        variables.visibleInnerHTML.addListener(arg => { element.innerHTML = arg })
    })(element.appendChild(document.createElement('select')));
    (element => {
        element.type = 'button'
        element.value = 'close'
        element.addEventListener('click', () => { dialogElement.close() })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(dialogElement));

(element => {
    element.style.marginLeft = '208px'
    element.type = 'button'
    element.value = 'visible'
    element.addEventListener('click', () => { dialogElement.showModal() })
})(document.body.appendChild(document.createElement('input')));

(element => {
    // element.style.marginLeft = '208px'
    element.type = 'button'
    element.value = 'download'
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

/** @type {HTMLTableSectionElement} */
let tHead
(element => {
    element.style.marginLeft = '208px'
    variables.tableInnerHTML.addListener(arg => {
        element.innerHTML = arg

        if (!element.tHead) return
        tHead = element.tHead
        console.log(tHead.rows[0])
        const tmp = Array.from(tHead.rows[0].cells)
            .filter(cell => cell.innerText !== '_name')
            .map(cell => `<option selected>${cell.innerText}</option>`).join('')
        variables.visibleInnerHTML.assign(tmp)

        // const tr = thead.firstElementChild
        // if (!tr) return
        // console.log(tr.childNodes)
        // Array.from(tr.children).forEach((/** @type {HTMLElement} */node) => {
        //     console.log(node.innerText)
        // })
    })
})(document.body.appendChild(document.createElement('table')));

variables.path.assign('/')