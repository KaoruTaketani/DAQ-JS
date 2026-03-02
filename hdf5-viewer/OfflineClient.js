import h5wasm from "./node_modules/h5wasm/dist/esm/hdf5_hl.js";
// import h5wasm from "https://cdn.jsdelivr.net/npm/h5wasm/dist/esm/hdf5_hl.js";
import imagesc from "../lib/imagesc.js";
import im2src from "../lib/im2src.js";
const { FS } = await h5wasm.ready;

let response_hdf5 = await fetch("/debug/sans59510.nxs.ngv.h5");
// let response = await fetch("https://ncnr.nist.gov/pub/ncnrdata/vsans/202003/24845/data/sans59510.nxs.ngv");
let ab = await response_hdf5.arrayBuffer();

FS.writeFile("sans59510.nxs.ngv", new Uint8Array(ab));

// (element => {
//     element.type = 'button'
//     element.value = 'parent folder'
// })(document.body.appendChild(document.createElement('input')));
// let subitems = await fetch("/readdir?path=/debug/");
// subitems.text().then(data => { console.log(data) })

// let path = '/'
// use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
let f = new h5wasm.File("sans59510.nxs.ngv", "r");
// File {path: "/", file_id: 72057594037927936n, filename: "data.h5", mode: "r"}
console.log(f)
console.log(f.keys())
console.log(f.get("entry/instrument").keys())
console.log(f.attrs);

const selectElement = document.createElement('select');
(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.addEventListener('dblclick', () => {
        const filename = element.options[element.selectedIndex].innerText
        console.log(`dblclick ${filename}`)
        if (!filename.endsWith('/')) return
        if (filename === '../') {
            const params = new URLSearchParams(window.location.search),
                path = params.get('path')
            // console.log(path)
            // console.log(path.length)
            // console.log(path?.lastIndexOf('/'))
            // console.log(path?.lastIndexOf('/', 5))
            // console.log(path?.lastIndexOf('/', path.length - 2))
            window.location.href = "http://localhost/OfflineClient.html?path=" + path?.substring(0, path.lastIndexOf('/', path.length - 2) + 1)
        } else {
            const params = new URLSearchParams(window.location.search)

            window.location.href = "http://localhost/OfflineClient.html?path=" + params.get('path') + filename
        }
    })
    element.addEventListener('change', () => {
        const filename = element.options[element.selectedIndex].innerText
        console.log(filename)
        if (filename.endsWith('/')) {
            divElement.innerText = ''
            return
        }
        if (!filename.endsWith('.h5')) return

        const params = new URLSearchParams(window.location.search)
        fetch(params.get('path') + `${filename}`).then(response => {
            response.arrayBuffer().then(ab => {
                FS.writeFile(filename, new Uint8Array(ab));

                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(filename, "r");
                // console.log(f.keys())
                // console.log(Object.keys(f.attrs))
                divElement.innerText = Object.keys(f.attrs).map(key => {
                    return `${key}: ${f.attrs[key].value}`
                }).join('\n')

                // console.log(filename)
                // if (filename === '1.h5') {
                //     imageElement.src = ''
                // } else {
                //     const dataset = f.get('/image')
                //     const h = {
                //         xBinLimits: [0, dataset.shape[0]],
                //         yBinLimits: [0, dataset.shape[1]],
                //         binCounts: dataset.value,
                //         numBins: dataset.shape
                //     }
                //     imageElement.src = im2src(imagesc(h), invisibleCanvasElement)
                // }
                // f.close()
            })
        })
    })
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
    // element.innerHTML = [0, 1, 2, 3, 4].map(i => `<option>${i}.h5</option>`).join()
    // attributesListeners.set('hdf5FileNamesInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
})(document.body.appendChild(selectElement));

const invisibleCanvasElement = document.createElement('canvas')
const imageElement = document.createElement('img')
imageElement.addEventListener('error', () => {
    console.log('image error')
    const ctx = canvasElement.getContext('2d')
    if (!ctx) throw new Error()

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
})
imageElement.addEventListener('load', () => {
    const ctx = canvasElement.getContext('2d')
    if (!ctx) throw new Error()

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height)
})
const divElement = document.body.appendChild(document.createElement('div'));
(element => {
    element.style.marginLeft = '208px'
})(divElement);
const canvasElement = document.body.appendChild(document.createElement('canvas'));
(element => {
    element.style.marginLeft = '200px'
    element.width = 512
    element.height = 512
})(canvasElement);

const params = new URLSearchParams(window.location.search)
// console.log(params.get('path'))
// let items = await fetch("/readdir?path=" + params.get('path'));
// items.text().then(data => {
//     // console.log(data)
//     selectElement.innerHTML = data
// }).catch(() => {
//     console.log('404')
//     document.body.innerHTML = '404'
// })
const response = await fetch("/readdir?path=" + params.get('path'));

// 2. Check for HTTP error status codes (404, 500, etc.)
if (!response.ok) {
    // throw new Error(`HTTP error! status: ${response.status}`);
    document.body.innerHTML = response.statusText
} else {
    // 3. Process the response data if all is good
    selectElement.innerHTML = await response.text()
}

