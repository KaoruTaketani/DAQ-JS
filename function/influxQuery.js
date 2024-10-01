const { request } = require('http')

console.log('query')
const token = ""

request('http://localhost:8086/api/v2/query?org=mlf', {
    method: "POST",
    headers: {
        "authorization": `Token ${token}`,
        "accept": 'application/csv',
        "content-type": 'application/vnd.flux'
    }
}, res => {
    res.setEncoding('utf8')
    res.on('data',chunk=>{
        console.log(chunk)
    })
    res.on('end',()=>{
        console.log('end')
    })
}).end([
    'from(bucket: "test")',
    '  |> range(start: -12h)',
    '  |> filter(fn: (r) => r["_measurement"] == "cp_data")',
    '  |> filter(fn: (r) => r["_field"] == "value")',
    '  |> yield(name: "mean")'
].join('\n'))

