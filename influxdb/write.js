import { request } from 'https'
import token from './token.js'
import org from './org.js'

const host = 'us-east-1-1.aws.cloud2.influxdata.com'

const req = request(
    {
        host: host,
        path: `/api/v2/write?org=${org()}&bucket=get-started&precision=s`,
        method: 'POST',
        headers: {
            'Authorization': `Token ${token()}`,
            'Content-Type': 'text/plain; charset=utf-8',
            'Accept': 'application/json'
        }
    },
    res => {
        console.log(`STATUS: ${res.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        })
        res.on('end', () => {
            console.log('No more data in response.');
        })
    }
)
req.write([
    'home,room=Living\\ Room temp=21.8,hum=36.0,co=0i',
    'home,room=Kitchen temp=22.7,hum=36.1,co=0i'
].join('\n'))


req.end()
