import QMapDrawer from "./QMapDrawer.js";
import QMapVariables from "./QMapVariables.js";

const variables = new QMapVariables()
new QMapDrawer(variables);

(element => {
    element.style.display = 'flex';
    element.appendChild(document.createTextNode('camera width (mm)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.cameraWidthInMillimeters.assign(element.value)
        })
        variables.cameraWidthInMillimeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex';
    element.appendChild(document.createTextNode('camera length (m)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.cameraLengthInMeters.assign(element.value)
        })
        variables.cameraLengthInMeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex';
    element.appendChild(document.createTextNode('moderator to sample (m)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.moderatorToSampleDistanceInMeters.assign(element.value)
        })
        variables.moderatorToSampleDistanceInMeters.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex';
    element.appendChild(document.createTextNode('tof min (ms)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.tofMinInMilliseconds.assign(element.value)
        })
        variables.tofMinInMilliseconds.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex';
    element.appendChild(document.createTextNode('tof max (ms)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.tofMaxInMilliseconds.assign(element.value)
        })
        variables.tofMaxInMilliseconds.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex';
    element.appendChild(document.createTextNode('incident angle (deg)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.step = '0.1'
        element.addEventListener('change', () => {
            variables.incidentAngleInDegrees.assign(element.value)
        })
        variables.incidentAngleInDegrees.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    variables.wavelengthMinInAngstroms.addListener(arg => {
        element.innerText = `wavelength min: ${arg} Å`
    })
})(document.body.appendChild(document.createElement('div')));

(element => {
    variables.wavelengthMaxInAngstroms.addListener(arg => {
        element.innerText = `wavelength max: ${arg} Å`
    })
})(document.body.appendChild(document.createElement('div')));

(element => {
    variables.sampleWidthInMillimeters.addListener(arg => {
        element.innerText = `sample width: ${arg} mm`
    })
})(document.body.appendChild(document.createElement('div')));


(element => {
    element.style.display = 'inline-block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.setupSVGInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

(element => {
    element.style.display = 'inline-block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.beamSVGInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.incidentAngleInDegrees.assign('1.5')
variables.tofMinInMilliseconds.assign('20')
variables.tofMaxInMilliseconds.assign('80')
variables.cameraLengthInMeters.assign('1.755')
variables.cameraWidthInMillimeters.assign('50')
variables.moderatorToSampleDistanceInMeters.assign('23.76')
