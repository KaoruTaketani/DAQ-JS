import { connect } from 'net'

const client = connect({
    port: 80,
    host:'localhost'
}, () => {
    client.write([
        'GET /now HTTP/1.1',
        'Host: localhost',
        'Connection: Close',
        '',
        ''
    ].join('\r\n'))
}).on('data', chunk => {
    console.log(`chunk: ${chunk.toString()}`)
}).on('end', () => {
    console.log('end')
})