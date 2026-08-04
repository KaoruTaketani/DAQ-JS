import CursorTextMaker from "./CursorTextMaker.js";
import ImageDrawer from "./ImageDrawer.js";
import ImageGetter from "./ImageGetter.js";
import ImageVariables from "./ImageVariables.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import PathMaker from "./PathMaker.js";
import AxesParametersParser from "./AxesParametersParser.js";

const variables = new ImageVariables()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new ImageDrawer(variables)
new ImageGetter(variables)
new AxesParametersParser(variables)
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
    /** @type {string} */
    let svgInnerHTML
    variables.svgInnerHTML.prependListener(arg => { svgInnerHTML = arg })
    // svg is always updated before canvas
    variables.canvasDataURL.addListener(arg => {
        linkElement.href = `data:image/svg+xml;base64,${btoa([
            '<svg xmlns="http://www.w3.org/2000/svg" >',
            svgInnerHTML,
            `<image width="560" height="420" href="${arg}" />`,
            '</svg>'
        ].join(''))}`
    })
    const linkElement = document.createElement('a');
    element.style.marginLeft = '208px'
    linkElement.setAttribute('download', `image.svg`)

    element.style.marginLeft = '208px'
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
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => {
        element.innerText = arg
    })
})(document.body.appendChild(document.createElement('div')));

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
            'rawImage',
            'filteredImage',
            'horizontalProjectionHistograms'
        ].forEach(key => { element.add(new Option(key)) })
        element.value = ''
    })(element.appendChild(document.createElement('select')));
})(document.body.appendChild(document.createElement('fieldset')));


(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'xlim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.xminValue.assign(element.value)
        })
        variables.xminValue.addListener(arg => { element.value = arg })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.xmaxValue.assign(element.value)
        })
        variables.xmaxValue.addListener(arg => { element.value = arg })
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
        element.addEventListener('change', () => {
            variables.yminValue.assign(element.value)
        })
        variables.yminValue.addListener(arg => { element.value = arg })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.ymaxValue.assign(element.value)
        })
        variables.ymaxValue.addListener(arg => { element.value = arg })
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
        element.addEventListener('change', () => {
            variables.cminValue.assign(element.value)
        })
        variables.cminValue.addListener(arg => { element.value = arg })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.cmaxValue.assign(element.value)
        })
        variables.cmaxValue.addListener(arg => { element.value = arg })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    // element.style.display = 'flex'
    element.innerText = 'clog';
    (element => {
        element.type = 'checkbox'
        element.addEventListener('change', () => {
            variables.cScale.assign(element.checked ? 'log' : 'linear')
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));


(element => {
    element.style.marginLeft = '208px'
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
        variables.axesElement.assign(element.firstElementChild)
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.path.assign('/')

