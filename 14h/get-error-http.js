import { request } from 'http'

const req = request(
    {
        host: 'localhost',
        path: `/randomNumber`,
        method: 'GET',
    },
    res => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
            data += chunk
        })
        res.on('end', () => {
            console.log(`code: ${res.statusCode}, data: ${data}`)
        })
    }
)

req.end()
