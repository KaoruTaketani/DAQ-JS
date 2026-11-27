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
            xhr.open('PUT', '/?stopChannel=2')
            xhr.send()
        }
        url.pathname = 'stopButtonDisabled'
        const disabledSocket = new WebSocket(url)
        disabledSocket.onmessage = event => {
            element.disabled = event.data
        }
    })(element.appendChild(document.createElement('input')));

    let clickedHref = '';
    const dialogElement = document.createElement('dialog');
    (element => {
        (element => {
            element.type = 'button'
            element.value = 'close'
            element.addEventListener('click', () => { element.parentElement.close() })
        })(element.appendChild(document.createElement('input')));
        const inputElement = document.createElement('input');
        (element => {
            element.style.marginLeft = '10px'
            element.style.width = '100px'
            element.style.marginRight = '10px'
            element.focu
        })(element.appendChild(inputElement));
        (element => {
            element.type = 'button'
            element.value = 'set'
            element.addEventListener('click', () => {
                const xhr = new XMLHttpRequest()
                const url=clickedHref.replace('#', '/?') + 'Destination=' + inputElement.value
                xhr.open('PUT', url)
                xhr.send()
                console.log(url)
                element.parentElement.close()
                inputElement.value = ''
            })
        })(element.appendChild(document.createElement('input')));
    })(element.appendChild(dialogElement));

    (element => {
        url.pathname = 'pulseMotorTableInnerHTML'
        const innerHTMLSocket = new WebSocket(url)
        innerHTMLSocket.onmessage = (/** @type {MessageEvent} */event) => {
            element.innerHTML = event.data

            const modalLinks = element.querySelectorAll('a[href^="#"]');
            modalLinks.forEach(modalLink => {
                modalLink.addEventListener('click', () => {
                    clickedHref = modalLink.getAttribute('href')
                    dialogElement.showModal()
                })
            })
        }
    })(element.appendChild(document.createElement('table')));


})(document.body.appendChild(document.createElement('fieldset')));


