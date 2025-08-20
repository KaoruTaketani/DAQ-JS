import { test } from 'node:test'
import filter from './filter.js'
import linspace from './linspace.js'

test('example input 1 in filter of matlab', () => {
    const t = linspace(-Math.PI, Math.PI, 100),
        x = t.map(_t => Math.sin(_t) + Math.random())

    console.log(filter([1 / 5, 1 / 5, 1 / 5, 1 / 5, 1 / 5], 1, x))
})

