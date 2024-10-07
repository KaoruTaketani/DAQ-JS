import { request } from 'https'
import token from './token.js'
import org from './org.js'

const host = 'us-east-1-1.aws.cloud2.influxdata.com'

const req = request(
    {
        host: host,
        path: `/api/v2/query?org=${org()}&bucket=get-started`,
        method: 'POST',
        headers: {
            'Authorization': `Token ${token()}`,
            'Content-Type': 'application/vnd.flux',
            'Accept': 'application/csv'
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
    'from(bucket: "get-started")',
    '  |> range(start: -1h)',
    '  |> filter(fn: (r) => r._measurement == "home")',
    '  |> filter(fn: (r) => r._field== "co" or r._field == "hum" or r._field == "temp")'
].join('\n'))

req.end()
