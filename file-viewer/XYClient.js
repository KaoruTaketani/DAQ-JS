import CursorTextMaker from "./CursorTextMaker.js";
import FigureCleanupperGraph from "./FigureCleanupperGraph.js";
import XYDrawer from "./XYDrawer.js";
import XYGetter from "./XYGetter.js";
import XYVariables from "./XYVariables.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import PathMaker from "./PathMaker.js";

const variables = new XYVariables()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new CursorTextMaker(variables)
new FigureCleanupperGraph(variables)
new XYDrawer(variables)
new XYGetter(variables)
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
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.display = 'inline-block';
    element.style.marginLeft = '200px';

    (element => {
        element.innerText = 'keys';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        // element.size = 20
        // element.style.position = 'absolute'
        // element.style.whiteSpace = 'pre-wrap'
        // element.style.left = '200px'
        element.style.width = '200px'
        // element.multiple = true
        // element.style.height = `${window.innerHeight - 8 * 2}px`
        // window.onscroll = _ => {
        //     element.style.top = `${window.scrollY + 8}px`
        // }
        element.addEventListener('change', () => {
            variables.xkeyText.assign(element.options[element.selectedIndex].text)
        });
        [
            'tofInMilliseconds',
            'velocityInMetersPerSeconds',
            'wavenumberInInverseAngstroms',
            'energyInMillielectronvolts',
            'wavelengthInAngstroms'
        ].forEach(key => { element.add(new Option(key)) })
        element.value = ''
    })(element.appendChild(document.createElement('select')));

    (element => {
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '200px'
        element.addEventListener('change', () => {
            variables.ykeyText.assign(element.options[element.selectedIndex].text)
        });
        [
            'centers',
            'contrast',
            'heights',
            'horizontalProjectionMeans',
            'horizontalProjectionStandardDeviations',
            'neutronRate',
            'phase',
            'widths',
            'reflectivity',
            'contrastRatio',
            'phaseShift'
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
        variables.cursorOffset.assign([ev.offsetX, ev.offsetY])
    })
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg

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