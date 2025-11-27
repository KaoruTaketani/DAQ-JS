import h5wasm from "./node_modules/h5wasm/dist/esm/hdf5_hl.js";
// import h5wasm from "https://cdn.jsdelivr.net/npm/h5wasm/dist/esm/hdf5_hl.js";
import bounds from "../lib/bounds.js";
import sub2ind from "../lib/sub2ind.js"
import rescale from "../lib/rescale.js"
const { FS } = await h5wasm.ready;

let response = await fetch("./sans59510.nxs.ngv.h5");
// let response = await fetch("https://ncnr.nist.gov/pub/ncnrdata/vsans/202003/24845/data/sans59510.nxs.ngv");
let ab = await response.arrayBuffer();

FS.writeFile("sans59510.nxs.ngv", new Uint8Array(ab));

// use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
let f = new h5wasm.File("sans59510.nxs.ngv", "r");
// File {path: "/", file_id: 72057594037927936n, filename: "data.h5", mode: "r"}
console.log(f)
console.log(f.keys())
console.log(f.get("entry/instrument").keys())
console.log(f.attrs);

(element => {
    element.size = 20
    element.style.position = 'absolute'
    element.style.whiteSpace = 'pre-wrap'
    element.style.width = '200px'
    element.style.height = `${window.innerHeight - 8 * 2}px`
    element.addEventListener('change', () => {
        const filename = element.options[element.selectedIndex].innerText
        // console.log(filename)

        fetch(`./${filename}`).then(response => {
            response.arrayBuffer().then(ab => {
                FS.writeFile(filename, new Uint8Array(ab));

                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(filename, "r");
                // console.log(f.keys())
                // console.log(Object.keys(f.attrs))
                divElement.innerText = Object.keys(f.attrs).map(key => {
                    return `${key}: ${f.attrs[key].value}`
                }).join('\n')

                const dataset = f.get('/rawImage')
                const h = {
                    xBinLimits: [0, dataset.shape[0]],
                    yBinLimits: [0, dataset.shape[1]],
                    binCounts: dataset.value,
                    numBins: dataset.shape
                }
                const ctx = canvasElement.getContext('2d')
                if (!ctx) return
                // imagedata(h)
                const lims = bounds(h.binCounts)
                console.log(lims)
                const arr = new Uint8ClampedArray(4 * dataset.shape[0] * dataset.shape[1])

                for (var y = 0; y < dataset.shape[0]; y++) {
                    for (var x = 0; x < dataset.shape[1]; x++) {
                        const c = h.binCounts[sub2ind(h.numBins, y, x)],
                            rgb = Math.floor(255 * rescale(c, lims))
                        arr[(y * dataset.shape[0] + x) * 4 + 0] = rgb;  // R
                        arr[(y * dataset.shape[0] + x) * 4 + 1] = rgb;  // G
                        arr[(y * dataset.shape[0] + x) * 4 + 2] = rgb;  // B
                        arr[(y * dataset.shape[0] + x) * 4 + 3] = 255;  // Alpha
                    }
                }
                const imagedata = new ImageData(arr, dataset.shape[0], dataset.shape[1]);

                // var tmp = document.createElement('canvas');
                var ctxInvisible = invisibleCanvasElement.getContext('2d');
                if(!ctxInvisible)return
                // console.log('new')
                invisibleCanvasElement.width = imagedata.width;
                invisibleCanvasElement.height = imagedata.height;
                ctxInvisible.putImageData(imagedata, 0, 0);

                var image = new Image();
                image.src = invisibleCanvasElement.toDataURL();
                ctx.drawImage(image,0,0,canvasElement.width,canvasElement.height)
                // f.close()
            })
        })
    })
    window.onscroll = _ => {
        element.style.top = `${window.scrollY + 8}px`
    }
    element.innerHTML = [0, 1, 2, 3, 4].map(i => `<option>${i}.h5</option>`).join()
    // attributesListeners.set('hdf5FileNamesInnerHTML', (/** @type {string} */arg) => { element.innerHTML = arg })
})(document.body.appendChild(document.createElement('select')));

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
const invisibleCanvasElement = document.body.appendChild(document.createElement('canvas'));
