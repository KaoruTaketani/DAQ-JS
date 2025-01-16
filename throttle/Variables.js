import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.histogram = new ListenableObject()

        this.randomNumber = new ListenableNumber()
    }
}

