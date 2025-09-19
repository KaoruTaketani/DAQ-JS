const xhr = new XMLHttpRequest()
let time = ''
xhr.open('POST', '/')
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        time = xhr.responseText
        console.log(xhr.responseText)
        // fetch('/'+xhr.responseText+'/hdf5FileNamesInnerHTML').then(data=>{
        // use # failed
        // fetch(`/hdf5FileNamesInnerHTML?${xhr.responseText}`).then(data=>{
        fetch(`/${time}?hdf5FileNamesInnerHTML`).then(response => {
            response.text().then(result => {
                // console.log(result)
                listboxElement.innerHTML = result
            })
        })
    }
})
xhr.send()


const listboxElement = document.createElement('select');
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.addEventListener('change', () => {
        console.log(element.options[element.selectedIndex].innerText)
        // socket.send(JSON.stringify({ hdf5ReaderFileName: element.options[element.selectedIndex].innerText }))
        xhr.open('PUT', `/${time}?hdf5FileReaderFileName=${element.options[element.selectedIndex].innerText}`)
        xhr.send()
    })
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
    // attributesListeners.set('hdf5FileNamesInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
})(document.body.appendChild(listboxElement));

(element => {
    element.style.marginLeft = '208px'
    // attributesListeners.set('divInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('div')));
