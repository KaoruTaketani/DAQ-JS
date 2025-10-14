import { connect } from 'net'

const body = ''
let data = ''
const client = connect({
    port: 80,
    host: 'localhost'
}, () => {
    client.write([
        'PUT /?randomNumberGeneratorIsBusy=true HTTP/1.1',
        'Host: localhost',
        'Connection: Close',
        `Content-Length: ${body.length}`,
        '',
        body
    ].join('\r\n'))
}).on('data', chunk => {
    data+=chunk
}).on('end', () => {
    console.log(data)
})