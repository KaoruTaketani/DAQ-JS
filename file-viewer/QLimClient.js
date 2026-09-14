import QLimDrawer from "./QLimDrawer.js";
import QLimVariables from "./QLimVariables.js";

const variables = new QLimVariables()
new QLimDrawer(variables);

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
    // if label after the input, use following code here
    // element.appendChild(document.createTextNode('camera length (m)'));
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex'
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
    element.style.display = 'flex'
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
    element.style.display = 'flex'
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
    element.style.display = 'flex'
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
    element.style.display = 'flex'
    element.appendChild(document.createTextNode('substrate scattering length density (1/Å²)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.substrateScatteringLengthDensityInSquaredReciprocalAngstroms.assign(element.value)
        })
        variables.substrateScatteringLengthDensityInSquaredReciprocalAngstroms.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex'
    element.appendChild(document.createTextNode('film scattering length density (1/Å²)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.filmScatteringLengthDensityInSquaredReciprocalAngstroms.assign(element.value)
        })
        variables.filmScatteringLengthDensityInSquaredReciprocalAngstroms.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));

(element => {
    element.style.display = 'flex'
    element.appendChild(document.createTextNode('film thickness (Å)'));
    (element => {
        element.type = 'number'
        element.style.width = '100px'
        element.addEventListener('change', () => {
            variables.filmThicknessInAngstroms.assign(element.value)
        })
        variables.filmThicknessInAngstroms.addListener(arg => {
            element.value = arg
        })
    })(element.appendChild(document.createElement('input')))
})(document.body.appendChild(document.createElement('label')));


(element => {
    element.style.display = 'inline-block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.reflectivitySVGInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

(element => {
    element.style.display = 'inline-block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.potentialSVGInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

variables.incidentAngleInDegrees.assign('1.5')
variables.tofMinInMilliseconds.assign('20')
variables.tofMaxInMilliseconds.assign('80')
variables.cameraLengthInMeters.assign('1.755')
variables.moderatorToSampleDistanceInMeters.assign('23.76')

// silicon
variables.substrateScatteringLengthDensityInSquaredReciprocalAngstroms.assign('2.03e-6')
// nickel
variables.filmScatteringLengthDensityInSquaredReciprocalAngstroms.assign('9.78e-6')
variables.filmThicknessInAngstroms.assign('700')

variables.qminInReciprocalAngstroms.assign('0.005')
variables.qmaxInReciprocalAngstroms.assign('0.165')