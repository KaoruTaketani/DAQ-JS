import { request } from 'https'
import token from './token.js'
import org from './org.js'
import Operator from '../14/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._influxReaderField
        variables.influxReaderField.addListener(arg => {
            this._influxReaderField = arg
            this._operation()
        })
        this._operation = () => {
            console.log(this._influxReaderField)
            const req = request(
                {
                    host: 'us-east-1-1.aws.cloud2.influxdata.com',
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

            req.end([
                'from(bucket: "get-started")',
                '  |> range(start: -1h)',
                '  |> filter(fn: (r) => r._measurement == "home")',
                `  |> filter(fn: (r) => r._field== "${this._influxReaderField}")`
            ].join('\n'))
        }
    }
}

