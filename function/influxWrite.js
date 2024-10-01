// see /Users/taketani/.influxdbv2 for thet data?
// or access http://localhost:8086 by a browser

const { request } = require('http')

console.log('hello')
const token = ""

request('http://localhost:8086/api/v2/write?org=mlf&bucket=test', {
    method: "POST",
    headers: {
        "authorization": `Token ${token}`
    }
},res=>{
    res.setEncoding('utf8')
    res.on('data',chunk=>{
        console.log(chunk)
    })
    res.on('end',()=>{
        console.log('end')
    })
}).end('cp_data value=110')

