import QRangeSVGInnerHTMLMaker from "./QRangeSVGInnerHTMLMaker.js";
import QrangeVariables from "./QRangeVariables.js";

const variables = new QrangeVariables()
new QRangeSVGInnerHTMLMaker(variables);

(element => {
    (element => {
        (element => {
            (element => {
                element.innerText = 'camera width (mm)'
            })(element.appendChild(document.createElement('th')));
            (element => {
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
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

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
                element.innerText = 'wavelength min (Å)'
            })(element.appendChild(document.createElement('th')));
            (element => {
                variables.wavelengthMinInAngstroms.addListener(arg => {
                    element.innerText = arg
                })
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'wavelength max (Å)'
            })(element.appendChild(document.createElement('th')));
            (element => {
                variables.wavelengthMaxInAngstroms.addListener(arg => {
                    element.innerText = arg
                })
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

        (element => {
            (element => {
                element.innerText = 'sample width (mm)'
            })(element.appendChild(document.createElement('th')));
            (element => {
                variables.sampleWidthInMillimeters.addListener(arg => {
                    element.innerText = arg
                })
            })(element.appendChild(document.createElement('td')));
        })(element.appendChild(document.createElement('tr')));

    })(element.appendChild(document.createElement('tbody')));
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

variables.incidentAngleInDegrees.assign('1.5')
variables.tofMinInMilliseconds.assign('20')
variables.tofMaxInMilliseconds.assign('80')
variables.cameraLengthInMeters.assign('1.755')
variables.cameraWidthInMillimeters.assign('50')
variables.moderatorToSampleDistanceInMeters.assign('23.76')
