import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(100)
        // super(10)
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._throttle()
        })
        this._operation = () => {
            const total = this._histogram.binCounts.reduce((prev, curr) => prev + curr, 0)

            console.log(`total: ${total}`)
        }
    }
}

