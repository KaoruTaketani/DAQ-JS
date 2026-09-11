import QLimDrawer from "./QLimDrawer.js";
import QLimVariables from "./QLimVariables.js";

const variables = new QLimVariables()
new QLimDrawer(variables);

(element => {
    (element => {
        (element => {
            (element => {
                element.innerText = 'camera length (m)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'moderator to sample (m)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'tof min (ms)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'tof max (ms)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'incident angle (deg)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'substrate scattering length density (1/Å^2)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'film scattering length density (1/Å^2)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

    })(element.appendChild(document.createElement('tbody')));
})(document.body.appendChild(document.createElement('table')));



(element => {
    element.style.display = 'inline-block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    variables.svgInnerHTML.addListener(arg => {
        element.innerHTML = arg
    })
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

(element => {
    element.style.display = 'inline-block'

    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    // variables.beamSVGInnerHTML.addListener(arg => {
    //     element.innerHTML = arg
    // })
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

variables.qminInReciprocalAngstroms.assign('0.005')
variables.qmaxInReciprocalAngstroms.assign('0.165')