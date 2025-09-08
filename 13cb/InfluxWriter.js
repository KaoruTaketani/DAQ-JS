import { request } from 'https'
import token from './token.js'
import org from './org.js'
import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            const req = request(
                {
                    host: 'us-east-1-1.aws.cloud2.influxdata.com',
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
            req.end(`home randomNumber=${this._randomNumber}`)
        }
    }
}

