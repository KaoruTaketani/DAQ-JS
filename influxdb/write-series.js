import { request } from 'https'
import { Buffer } from 'buffer'
import token from './token.js'
import org from './org.js'

const host = 'us-east-1-1.aws.cloud2.influxdata.com'

const data = [
    ['home,room=Living\\ Room temp=21.1,hum=35.9,co=0i',
        'home,room=Kitchen temp=21.0,hum=35.9,co=0i'].join('\n'),
    ['home,room=Living\\ Room temp=21.4,hum=35.9,co=0i',
        'home,room=Kitchen temp=23.0,hum=36.2,co=0i'].join('\n'),
    ['home,room=Living\\ Room temp=21.8,hum=36.0,co=0i',
        'home,room=Kitchen temp=22.7,hum=36.1,co=0i'].join('\n'),
    ['home,room=Living\\ Room temp=22.2,hum=36.0,co=0i',
        'home,room=Kitchen temp=22.4,hum=36.0,co=0i'].join('\n'),
    ['home,room=Living\\ Room temp=22.2,hum=35.9,co=0i',
        'home,room=Kitchen temp=22.5,hum=36.0,co=0i'].join('\n'),
    ['home,room=Living\\ Room temp=22.4,hum=36.0,co=0i',
        'home,room=Kitchen temp=22.8,hum=36.5,co=1i'].join('\n'),
    ['home,room=Living\\ Room temp=22.3,hum=36.1,co=0i',
        'home,room=Kitchen temp=22.8,hum=36.3,co=1i'].join('\n'),
    ['home,room=Living\\ Room temp=22.3,hum=36.1,co=1i',
        'home,room=Kitchen temp=22.7,hum=36.2,co=3i'].join('\n'),
    ['home,room=Living\\ Room temp=22.4,hum=36.0,co=4i',
        'home,room=Kitchen temp=22.4,hum=36.0,co=7i'].join('\n'),
    ['home,room=Living\\ Room temp=22.6,hum=35.9,co=5i',
        'home,room=Kitchen temp=22.7,hum=36.0,co=9i'].join('\n'),
    ['home,room=Living\\ Room temp=22.8,hum=36.2,co=9i',
        'home,room=Kitchen temp=23.3,hum=36.9,co=18i'].join('\n'),
    ['home,room=Living\\ Room temp=22.5,hum=36.3,co=14i',
        'home,room=Kitchen temp=23.1,hum=36.6,co=22i'].join('\n'),
    ['home,room=Living\\ Room temp=22.2,hum=36.4,co=17i',
        'home,room=Kitchen temp=22.7,hum=36.5,co=26i'].join('\n')
]
const startTime = Date.now()
let byteLength = 0

data.reduce((previous, value) => previous.then(() =>
    new Promise(resolve => {
        setTimeout(() => {
            // console.log(value)
            byteLength += Buffer.byteLength(value)
            request(
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
                    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
                    res.setEncoding('utf8')
                    res.on('data', (chunk) => {
                        // console.log(`BODY: ${chunk}`);
                    })
                    res.on('end', () => {
                        // console.log('No more data in response.');
                        resolve()
                    })
                }
            ).end(value)
        }, 1000)
    })
), Promise.resolve()).then(() => {
    console.log(`end elapsedTime: ${Date.now() - startTime} ms, byteLength: ${byteLength} bytes, ${byteLength / (Date.now() - startTime)} kB/s`)
    // limits:
    // https://docs.influxdata.com/influxdb/cloud/account-management/limits/
    //
    // cardinality:
    // https://docs.influxdata.com/influxdb/cloud/write-data/best-practices/resolve-high-cardinality/
})
