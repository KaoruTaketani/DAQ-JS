import CursorTextMaker from "./CursorTextMaker.js";
import FigureCleanupperPNG from "./FigureCleanupperPNG.js";
import FigureDrawerImage from "./FigureDrawerImage.js";
import FigureGetterImage from "./FigureGetterImage.js";
import FigureVariablesPNG from "./FigureVariablesPNG.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import PathMaker from "./PathMaker.js";

const variables = new FigureVariablesPNG()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new FigureCleanupperPNG(variables)
new FigureDrawerImage(variables)
new FigureGetterImage(variables)
new CursorTextMaker(variables)
    ;
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.multiple = true
    element.style.height = `${window.innerHeight - 8 * 2}px`
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
    element.style.marginLeft = '208px'
    variables.path.addListener(arg => { element.innerText = `path: ${arg}` })
})(document.body.appendChild(document.createElement('p')));


(element => {
    element.style.display = 'inline-block';
    element.style.marginLeft = '200px';

    (element => {
        element.innerText = 'key';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '200px'
        element.addEventListener('change', () => {
            variables.keyText.assign(element.options[element.selectedIndex].text)
        });
        [
            'rawImage'
        ].forEach(key => { element.add(new Option(key)) })
        element.value = ''
    })(element.appendChild(document.createElement('select')));
})(document.body.appendChild(document.createElement('fieldset')));

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
    // element.style.marginLeft = '208px'
    element.appendChild(document.createTextNode('custom? '));
    (element => {
        // element.style.marginLeft = '208px'
        element.type = 'checkbox'
        // element.checked = true
        element.addEventListener('click', () => {
            variables.customChecked.assign(element.checked)

            variables.xminDisabled.assign(!element.checked)
            variables.xmaxDisabled.assign(!element.checked)
            variables.yminDisabled.assign(!element.checked)
            variables.ymaxDisabled.assign(!element.checked)
            variables.cminDisabled.assign(!element.checked)
            variables.cmaxDisabled.assign(!element.checked)
        })
        variables.customChecked.addListener(arg => { element.checked = arg })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'xlim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.width = '100px'
        element.disabled = true
        element.addEventListener('change', () => {
            variables.xminValue.assign(element.value)
        })
        variables.xminValue.addListener(arg => { element.value = arg })
        variables.xminDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.disabled = true
        element.addEventListener('change', () => {
            variables.xmaxValue.assign(element.value)
        })
        variables.xmaxValue.addListener(arg => { element.value = arg })
        variables.xmaxDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'ylim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.width = '100px'
        element.disabled = true
        element.addEventListener('change', () => {
            variables.yminValue.assign(element.value)
        })
        variables.yminValue.addListener(arg => { element.value = arg })
        variables.yminDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.disabled = true
        element.addEventListener('change', () => {
            variables.ymaxValue.assign(element.value)
        })
        variables.ymaxValue.addListener(arg => { element.value = arg })
        variables.ymaxDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'clim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.width = '100px'
        element.disabled = true
        element.addEventListener('change', () => {
            variables.cminValue.assign(element.value)
        })
        variables.cminValue.addListener(arg => { element.value = arg })
        variables.cminDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.disabled = true
        element.addEventListener('change', () => {
            variables.cmaxValue.assign(element.value)
        })
        variables.cmaxValue.addListener(arg => { element.value = arg })
        variables.cmaxDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

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