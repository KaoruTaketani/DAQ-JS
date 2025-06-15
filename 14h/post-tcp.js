import { connect } from 'net'

const body ='{"randomNumberGeneratorIsBusy":true}'
const client = connect({
    port: 80,
    host:'localhost'
}, () => {
    client.write([
        'POST /message HTTP/1.1',
        'Host: localhost',
        'Connection: Close',
        'Content-Type: application/json',
        `Content-Length: ${body.length}`,
        '',
        body
    ].join('\r\n'))
}).on('data', chunk => {
    console.log(`chunk: ${chunk.toString()}`)
}).on('end', () => {
    console.log('end')
})