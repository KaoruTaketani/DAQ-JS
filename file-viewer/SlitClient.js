import SlitSVGInnerHTMLMaker from "./SlitSVGInnerHTMLMaker.js";
import SlitVariables from "./SlitVariables.js";

const variables = new SlitVariables()
new SlitSVGInnerHTMLMaker(variables)
    ;
(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'distance (m)';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.upstreamSlitToDownstreamSlitDistanceInMeters.assign(element.value)
        })
        variables.upstreamSlitToDownstreamSlitDistanceInMeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.downstreamSlitToDetectorDistanceInMeters.assign(element.value)
        })
        variables.downstreamSlitToDetectorDistanceInMeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    element.style.display = 'inline-block';

    (element => {
        element.innerText = 'slit widths (mm)';
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.step = '0.1'
        element.addEventListener('change', () => {
            variables.upstreamSlitWidthInMillimeters.assign(element.value)
        })
        variables.upstreamSlitWidthInMillimeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'number'
        element.style.display = 'flex'
        element.style.marginTop = '8px'
        element.style.width = '100px'
        element.step = '0.1'
        element.addEventListener('change', () => {
            variables.downstreamSlitWidthInMillimeters.assign(element.value)
        })
        variables.downstreamSlitWidthInMillimeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    element.style.display = 'inline'
    variables.tableInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElement('table')));



(element => {
    element.style.display = 'block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.setupSVGInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

(element => {
    // element.style.display = 'block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.beamSVGInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.upstreamSlitToDownstreamSlitDistanceInMeters.assign('3.5')
variables.downstreamSlitToDetectorDistanceInMeters.assign('2.055')
variables.upstreamSlitWidthInMillimeters.assign('2')
variables.downstreamSlitWidthInMillimeters.assign('0.4')
