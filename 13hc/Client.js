const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

(element => {
    (element => {
        element.innerText = 'random number generator'
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'button'
        element.value = 'start'
        element.style.width = '130px'
        element.onclick = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT', '/?randomNumberGeneratorIsBusy=true')
            xhr.send()
        }
        url.pathname = 'startButtonDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = event => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'button'
        element.value = 'stop'
        element.style.width = '130px'
        element.onclick = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT', '/?randomNumberGeneratorIsBusy=false')
            xhr.send()
        }
        url.pathname = 'stopButtonDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = event => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.innerText = 'preset';

        (element => {
            let value

            element.type = 'number'
            element.min = 1
            element.addEventListener('change', () => {
                if (Number.isNaN(element.valueAsNumber)) {
                    element.value = value
                    return
                }

                const xhr = XMLHttpRequest()
                xhr.open('PUT', `/?preset=${element.value}`)
                xhr.send()
            })
            url.pathname = 'presetValue'
            const valueSocket = new WebSocket(url)
            valueSocket.onmessage = event => {
                element.value = event.data
                value = element.value
            }
            url.pathname = 'presetDisabled'
            const disabledSocket = new WebSocket(url)
            disabledSocket.onmessage = event => {
                element.disabled = event.data === 'true'
            }
        })(element.appendChild(document.createElement('input')));
    })(element.appendChild(document.createElement('label')));
})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    (element => {
        element.innerText = 'batch processor'
    })(element.appendChild(document.createElement('legend')));

    (element => {
        element.type = 'button'
        element.value = 'start'
        element.style.width = '130px'
        element.onclick = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT','/?batchProcessorIsBusy=true')
            xhr.send()
        }
        url.pathname = 'batchStartButtonDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = event => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));

    (element => {
        element.type = 'button'
        element.value = 'stop'
        element.style.width = '130px'
        element.onclick = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT','/?batchProcessorIsBusy=false')
            xhr.send()
        }
        url.pathname = 'batchtopButtonDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = event => {
            element.disabled = event.data === 'true'
        }
    })(element.appendChild(document.createElement('input')));

    (element => {
        url.pathname = 'batchTableInnerHTML'
        const innerHTMLSocket = new WebSocket(url)
        innerHTMLSocket.onmessage = event => {
            element.innerHTML = event.data
        }
    })(element.appendChild(document.createElement('table')));

})(document.body.appendChild(document.createElement('fieldset')));

(element => {
    url.pathname = 'randomNumberInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = event => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

(element => {
    element.setAttribute('width', '400')
    element.setAttribute('height', '300')
    element.setAttribute('viewBox', '0 0 560 420')
    url.pathname = 'histogramSVGInnerHTML'
    const innerHTMLSocket = new WebSocket(url)
    innerHTMLSocket.onmessage = event => {
        element.innerHTML = event.data
    }
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
