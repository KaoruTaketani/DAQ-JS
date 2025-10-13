const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    (element => {
        element.innerText = 'pulse motor'
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'button'
        element.value = 'stop'
        element.style.width = '130px'
        element.onclick = () => {
            socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
        }
        url.pathname = 'stopButtonDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));

    (element => {
        (element => {
            (element => {
                (element => {
                    element.innerText = 'channel'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'pulse'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'destination'
                })(element.appendChild(document.createElement('th')));
            })(element.appendChild(document.createElement('tr')));

        })(element.appendChild(document.createElement('thead')));

        (element => {
            (element => {
                (element => {
                    element.style.textAlign = 'right'
                    element.innerText = '1'
                })(element.appendChild(document.createElement('td')));
                (element => {
                    element.style.textAlign = 'right'
                    url.pathname = 'channel1PulseInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'
                    url.pathname = 'channel1DestinationInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));
            })(element.appendChild(document.createElement('tr')));

            (element => {
                (element => {
                    element.style.textAlign = 'right'
                    element.innerText = '2'
                })(element.appendChild(document.createElement('td')));
                (element => {
                    element.style.textAlign = 'right'

                    url.pathname = 'channel2PulseInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right';

                    (element => {
                        element.href = '#'
                        const dialogElement = document.createElement('dialog');
                        (element => {
                            const inputElement = document.createElement('input');
                            (element => {
                                (element => {
                                    element.type = 'input'
                                    element.style.width = '240px'
                                    element.style.margin = '10px'

                                })(element.appendChild(inputElement));
                            })(element.appendChild(document.createElement('div')));
                            (element => {
                                element.value = 'ok'
                                element.style.width = '130px'
                                element.type = 'button'
                                element.onclick = () => {
                                    const xhr = new XMLHttpRequest()
                                    xhr.open('PUT', `/?channel2Destination=${inputElement.value}`)
                                    xhr.send()

                                    dialogElement.close()
                                }
                            })(element.appendChild(document.createElement('input')));
                            (element => {
                                element.value = 'cancel'
                                element.style.width = '130px'
                                element.type = 'button'
                                element.onclick = () => {
                                    dialogElement.close()
                                }
                            })(element.appendChild(document.createElement('input')));
                        })(document.body.appendChild(dialogElement))

                        element.onclick = () => {
                            dialogElement.showModal()
                        }
                        url.pathname = 'channel2DestinationInnerText'
                        const innerTextSocket = new WebSocket(url)
                        innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                            element.innerText = event.data
                        }
                    })(element.appendChild(document.createElement('a')));
                })(element.appendChild(document.createElement('td')));
            })(element.appendChild(document.createElement('tr')));
        })(element.appendChild(document.createElement('tbody')));
    })(element.appendChild(document.createElement('table')));
})(document.body.appendChild(document.createElement('fieldset')));








(element => {
    (element => {
        element.innerText = 'slit'
    })(element.appendChild(document.createElement('legend')));

    (element => {
        (element => {
            (element => {
                (element => {
                    element.innerText = 'channel'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'pulse'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'destination'
                })(element.appendChild(document.createElement('th')));
            })(element.appendChild(document.createElement('tr')));

        })(element.appendChild(document.createElement('thead')));

        (element => {
            (element => {
                (element => {
                    element.innerText = '1'
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'
                    url.pathname = 'channel1PulseInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));

                (element => {
                    const destinationElement = document.createElement('input')
                    destinationElement.style.width = '130px'
                    url.pathname = 'DestinationDisabled'
                    const destinationDisabledSocket = new WebSocket(url)
                    destinationDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
                        destinationElement.disabled = event.data === 'true'
                    }
                    url.pathname = 'xDestinationValue'
                    const valueSocket = new WebSocket(url)
                    valueSocket.onmessage = (/** @type {MessageEvent}*/event) => {
                        destinationElement.value = event.data
                    }
                    element.appendChild(destinationElement)

                    const buttonElement = document.createElement('input')
                    buttonElement.type = 'button'
                    buttonElement.value = 'move'
                    buttonElement.onclick = () => {
                        const destination = parseInt(destinationElement.value)
                        if (Number.isNaN(destination)) {
                            destinationElement.value = `NaN`
                        } else {
                            socket.send(JSON.stringify({ xDestination: destination }))
                        }
                    }
                    url.pathname = 'moveXButtonDisabled'
                    const buttonDisabledSocket = new WebSocket(url)
                    buttonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
                        buttonElement.disabled = event.data === 'true'
                    }
                    element.appendChild(buttonElement)
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'
                    element.innerText = 'off'
                })(element.appendChild(document.createElement('td')));
            })(element.appendChild(document.createElement('tr')));


            (element => {
                (element => {
                    element.innerText = 'theta'
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'
                    url.pathname = 'thetaPulseInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));

                (element => {
                    const destinationElement = document.createElement('input')
                    destinationElement.style.width = '130px'
                    url.pathname = 'thetaDestinationDisabled'
                    const destinationDisabledSocket = new WebSocket(url)
                    destinationDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
                        destinationElement.disabled = event.data === 'true'
                    }
                    url.pathname = 'thetaDestinationValue'
                    const destinationValueSocket = new WebSocket(url)
                    destinationValueSocket.onmessage = (/** @type {MessageEvent}*/event) => {
                        destinationElement.value = event.data
                    }
                    element.appendChild(destinationElement)

                    const buttonElement = document.createElement('input')
                    buttonElement.type = 'button'
                    buttonElement.value = 'move'
                    buttonElement.onclick = () => {
                        const destination = parseInt(destinationElement.value)
                        if (Number.isNaN(destination)) {
                            destinationElement.value = `NaN`
                        } else {
                            socket.send(JSON.stringify({ thetaDestination: destination }))
                        }
                    }
                    url.pathname = 'moveThetaButtonDisabled'
                    const buttonDisabledSocket = new WebSocket(url)
                    buttonDisabledSocket.onmessage = (/** @type {MessageEvent}*/event) => {
                        buttonElement.disabled = event.data === 'true'
                    }
                    element.appendChild(buttonElement)
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'
                    element.innerText = 'off'
                })(element.appendChild(document.createElement('td')));
            })(element.appendChild(document.createElement('tr')));
        })(element.appendChild(document.createElement('tbody')));
    })(element.appendChild(document.createElement('table')));
})(document.body.appendChild(document.createElement('fieldset')));








