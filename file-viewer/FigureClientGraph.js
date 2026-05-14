import FigureCleanupperSVG from "./FigureCleanupperSVG.js";
import FigureDrawerGraph from "./FigureDrawerGraph.js";
import FigureGetterGraph from "./FigureGetterGraph.js";
import FigureVariablesGraph from "./FigureVariablesGraph.js";
import FilesGetterHDF5 from "./FilesGetterHDF5.js";
import PathMaker from "./PathMaker.js";

const variables = new FigureVariablesGraph()
new PathMaker(variables)
new FilesGetterHDF5(variables)
new FigureCleanupperSVG(variables)
new FigureDrawerGraph(variables)
new FigureGetterGraph(variables)
    ;
const listboxElement = document.createElement('select');
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
})(document.body.appendChild(listboxElement));

(element => {
    element.style.marginLeft = '208px'
    variables.path.addListener(arg => { element.innerText = `path: ${arg}` })
})(document.body.appendChild(document.createElement('p')));


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
        })
        element.innerHTML = [
            '<option>_calculated_</option>',
            '<option>energyInMillielectronvolts</option>',
            '<option>tofInNanoseconds</option>'
        ].join('')
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
            'horizontalProjectionBinCounts',
            'horizontalProjectionMeans',
            'horizontalProjectionStandardDeviations'
        ].forEach(key => {
            element.add(new Option(key))
        })
        element.value = ''
    })(element.appendChild(document.createElement('select')));
})(document.body.appendChild(document.createElement('fieldset')));

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
        element.innerText = 'xlim';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.disabled = true
        // element.min = '0'
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
        // element.min = '0'
        element.addEventListener('change', () => {
            variables.ymaxValue.assign(element.value)
        })
        variables.ymaxValue.addListener(arg => { element.value = arg })
        variables.ymaxDisabled.addListener(arg => { element.disabled = arg })
    })(element.appendChild(document.createElement('input')));

})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    element.style.marginLeft = '208px'
    variables.divInnerText.addListener(arg => { element.innerText = arg })
})(document.body.appendChild(document.createElement('div')));

(element => {
    element.style.marginLeft = '208px'
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.path.assign('/')