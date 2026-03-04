import h5wasm from "./node_modules/h5wasm/dist/esm/hdf5_hl.js";
const { FS } = await h5wasm.ready;

export default class {
    /**
     * @param {import('./OfflineVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._path
        variables.path.prependListener(arg => { this._path = arg })
        /** @type {HTMLDivElement} */
        this._divElement
        variables.divElement.prependListener(arg => { this._divElement = arg })
        /** @type {HTMLSelectElement} */
        this._selectElement
        variables.selectElement.addListener(arg => {
            this._selectElement = arg
            this._operation()
        })
        this._operation = () => {
            this._selectElement.addEventListener('change', () => {
                const filename = this._selectElement.options[this._selectElement.selectedIndex].innerText
                if (filename.endsWith('/')) {
                    this._divElement.innerText = ''
                    return
                }
                if (!filename.endsWith('.h5')) return

                const filePath = this._path === '/' ? `/${filename}` : `${this._path}/${filename}`

                fetch(filePath).then(response => {
                    response.arrayBuffer().then(ab => {
                        FS.writeFile(filename, new Uint8Array(ab));

                        // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                        let f = new h5wasm.File(filename, "r");
                        this._divElement.innerText = Object.keys(f.attrs).map(key => {
                            return `${key}: ${f.attrs[key].value}`
                        }).join('\n')
                    })
                })
            })
        }
    }
}
