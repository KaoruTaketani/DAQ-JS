import getCurrentPoint from "../lib/getCurrentPoint.js";
import getXLim from "../lib/getXLim.js";
import getYLim from "../lib/getYLim.js";
import isbetween from "../lib/isbetween.js";
import FilesGetter from "./FilesGetter.js";
import PathMaker from "./PathMaker.js";
import WaveformDrawer from "./WaveformDrawer.js";
import WaveformArrayGetter from "./WaveformArrayGetter.js";
import WaveformArrayVariables from "./WaveformArrayVariables.js";
import NumWaveformsGetter from "./NumWaveformsGetter.js";

const variables = new WaveformArrayVariables()
new PathMaker(variables)
new FilesGetter(variables)
new NumWaveformsGetter(variables)
new WaveformDrawer(variables)
new WaveformArrayGetter(variables)
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
    variables.filesInnerHTML.addListener(arg => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

(element => {
    const linkElement = document.createElement('a');
    variables.svgInnerHTML.addListener(arg => {
        linkElement.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" >${arg}</svg>`
        ))
        linkElement.setAttribute('download', `waveform.svg`)
    })
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
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '208px'
    variables.numWaveformsInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.display = 'inline-block';
    element.style.marginLeft = '200px';

    (element => {
        element.innerText = 'offset';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.value = '0'
        element.min = '0'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '200px'
        element.addEventListener('change', () => {
            variables.offsetValue.assign(element.value)
        });
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'xlim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
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
    element.style.marginLeft = '208px'
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    element.addEventListener('mousemove', ev => {
        if (!element.firstChild) return

        const [x, y] = getCurrentPoint(/** @type {HTMLElement} */(element.firstChild), ev)
        const xLim = getXLim(/** @type {HTMLElement} */(element.firstChild))
        const yLim = getYLim(/** @type {HTMLElement} */(element.firstChild))

        if (!isbetween(x, xLim) || !isbetween(y, yLim)) {
            variables.divInnerText.assign(`cursor: undefined`)
        } else {
            variables.divInnerText.assign(`cursor: {x: ${x}, y: ${y}}`)
        }
    })
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.extname.assign('sigb')
variables.path.assign('/')
variables.offsetValue.assign('0')
