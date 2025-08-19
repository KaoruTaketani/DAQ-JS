import { request } from 'https'
import { createInterface } from 'readline'
import token from './token.js'
import org from './org.js'
import Operator from '../14/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._timeSeries
        variables.timeSeries.addListener(arg => { this._timeSeries = arg })
        this._influxReaderField
        variables.influxReaderField.addListener(arg => {
            this._influxReaderField = arg
            this._operation()
        })
        this._operation = () => {
            console.log(this._influxReaderField)
            let count = 0
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
                    // res.on('data', (chunk) => {
                    //     console.log(`BODY: ${chunk}`);
                    // })
                    // res.on('end', () => {
                    //     console.log('No more data in response.');
                    // })
                    const rl = createInterface({
                        input: res,
                        crlfDelay: Infinity // This option helps in handling different line endings
                    })
                    rl.on('line', line => {
                        const time = Date.parse(line.split(',')[5]),
                            data = parseFloat(line.split(',')[6])
                        // console.log(`${time} ${data}`)
                        if (Number.isNaN(time) || Number.isNaN(data)) return

                        count++
                        this._timeSeries.time.copyWithin(0, 1)
                        this._timeSeries.time[this._timeSeries.time.length - 1] = time
                        this._timeSeries.data.copyWithin(0, 1)
                        this._timeSeries.data[this._timeSeries.data.length - 1] = data
                    }).on('close', () => {
                        console.log(`readline.close count: ${count}`)
                        variables.timeSeries.assign(this._timeSeries)
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

