import h5wasm from "./node_modules/h5wasm/dist/esm/hdf5_hl.js";
// import h5wasm from "https://cdn.jsdelivr.net/npm/h5wasm/dist/esm/hdf5_hl.js";
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
console.log(f.attrs)
