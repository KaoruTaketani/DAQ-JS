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
            const xhr = new XMLHttpRequest()
            xhr.open('PUT','/?stopChannel=2')
            xhr.send()
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
                    element.style.textAlign = 'right';

                    (element => {
                        element.href = '#'
                        url.pathname = 'channel1DestinationInnerText'
                        const innerTextSocket = new WebSocket(url)
                        innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                            element.innerText = event.data
                        }
                    })(element.appendChild(document.createElement('a')));
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
                    element.innerText = 'key'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'magnitude'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'destination'
                })(element.appendChild(document.createElement('th')));
                (element => {
                    element.innerText = 'unit'
                })(element.appendChild(document.createElement('th')));
            })(element.appendChild(document.createElement('tr')));

        })(element.appendChild(document.createElement('thead')));

        (element => {
            (element => {
                (element => {
                    element.innerText = 'center'
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'
                    url.pathname = 'centerInMillimetersInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right';

                    (element => {
                        element.href = '#'

                        url.pathname = 'centerDestinationInnerText'
                        const innerTextSocket = new WebSocket(url)
                        innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                            element.innerText = event.data
                        }
                    })(element.appendChild(document.createElement('a')));
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.innerText = 'mm'
                })(element.appendChild(document.createElement('td')));
            })(element.appendChild(document.createElement('tr')));


            (element => {
                (element => {
                    element.innerText = 'width'
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right'

                    url.pathname = 'widthInMillimetersInnerText'
                    const innerTextSocket = new WebSocket(url)
                    innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                        element.innerText = event.data
                    }
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.style.textAlign = 'right';

                    (element => {
                        element.href = '#'

                        url.pathname = 'widthDestinationInnerText'
                        const innerTextSocket = new WebSocket(url)
                        innerTextSocket.onmessage = (/** @type {MessageEvent} */event) => {
                            element.innerText = event.data
                        }
                    })(element.appendChild(document.createElement('a')));
                })(element.appendChild(document.createElement('td')));

                (element => {
                    element.innerText = 'mm'
                })(element.appendChild(document.createElement('td')));
            })(element.appendChild(document.createElement('tr')));
        })(element.appendChild(document.createElement('tbody')));
    })(element.appendChild(document.createElement('table')));
})(document.body.appendChild(document.createElement('fieldset')));








