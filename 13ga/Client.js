const url = new URL(import.meta.url)
url.protocol = 'ws:'
url.pathname = ''
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement);



(formElement => {
    // formElement.method = 'post';
    // formElement.onsubmit = () => {
    //     fetch("localhost", {
    //         method: "POST",
    //         body: new FormData(formElement),
    //     }).then(response => {
    //         console.log(response);
    //     })
    // }

    (element => {
        element.innerHTML = 'minimum';
        (element => {
            element.type = 'text'
            element.name = 'xMin'
            element.style.width = '130px'
            element.style.display = 'block'
        })(element.appendChild(document.createElement('input')));
    })(formElement.appendChild(document.createElement('label')));

    (element => {
        element.innerHTML = 'maximum';
        (element => {
            element.type = 'text'
            element.name = 'xMax'
            element.style.width = '130px'
            element.style.display = 'block'
        })(element.appendChild(document.createElement('input')));
    })(formElement.appendChild(document.createElement('label')));

    (element => {
        element.type = 'button'
        element.onclick = () => {
            // const formData = new FormData(formElement)
            // for (const [key, value] of formData) {
            //     console.log(`${key}: ${value}`);
            // }
            // const params = new URLSearchParams(formData)
            // params.forEach((value, key) => {
            //     console.log(`key: ${key}, value: ${value}`)
            // })
            fetch("localhost", {
                method: "POST",
                body: new URLSearchParams(new FormData(formElement)),
            }).then(response => {
                console.log(response)
                dialogElement.close()
            })
        }
        // element.type = 'submit'
        // element.formMethod = 'post'
        // element.formTarget='_blank'
        element.value = 'ok'
        element.style.width = '130px'
        element.style.display = 'block'
    })(formElement.appendChild(document.createElement('input')));
})(dialogElement.appendChild(document.createElement('form')));

(element => {
    element.type = 'button'
    element.value = 'cancel'
    element.style.width = '130px'
    element.style.display = 'block'
    element.onclick = () => {
        dialogElement.close()
    }
})(dialogElement.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'start'
    element.style.width = '130px'
    element.onclick = () => {
        socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: true }))
    }
    url.pathname = 'startButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    element.type = 'button'
    element.value = 'stop'
    element.style.width = '130px'
    element.onclick = () => {
        socket.send(JSON.stringify({ randomNumberGeneratorIsBusy: false }))
    }
    url.pathname = 'stopButtonDisabled'
    const disabledSocket = new WebSocket(url)
    disabledSocket.onmessage = event => {
        element.disabled = event.data === 'true'
    }
})(document.body.appendChild(document.createElement('input')));

(element => {
    url.pathname = 'startTimeInnerText'
    const innerTextSocket = new WebSocket(url)
    innerTextSocket.onmessage = event => {
        element.innerText = event.data
    }
})(document.body.appendChild(document.createElement('p')));

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
    element.ondblclick = () => {
        dialogElement.showModal()
    }
})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')));

