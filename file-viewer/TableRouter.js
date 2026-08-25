import express from 'express';
import { closeSync, openSync, readSync } from 'fs';
import { join } from 'path';
import isbetween from '../lib/isbetween.js';

const router = express.Router();

router.get('/table', (req, res) => {
    if (!process.env.edrPath
        || typeof req.query.offset !== 'string'
        || typeof req.query.path !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.status(404).send()
        return
    }

    const offset = parseInt(req.query.offset)
    const fd = openSync(join(process.env.edrPath, req.query.path, req.query.fileName), 'r')
    const chunk = new Uint8Array(8 * 25)
    readSync(fd, chunk, 0, 8 * 25, 8 * offset)
    closeSync(fd)

    if (req.query.header === '0x5a') {
        const channelEvents = new Array(25)
        for (let i = 0; i < chunk.length / 8; ++i) {
            if (chunk[8 * i] === 0x5a) {
                const
                    byte1 = chunk[8 * i + 1],
                    byte2 = chunk[8 * i + 2],
                    byte3 = chunk[8 * i + 3],
                    byte4 = chunk[8 * i + 4],
                    byte5 = chunk[8 * i + 5],
                    byte6 = chunk[8 * i + 6],
                    byte7 = chunk[8 * i + 7],
                    tof = ((byte1 << 16) + (byte2 << 8) + byte3) * 25, /** time bin is 25 nsec */
                    channel = byte4 & 0b111,
                    module = byte4 >> 3,
                    left = (byte5 << 4) + (byte6 >> 4),
                    right = ((byte6 & 0b1111) << 8) + byte7

                channelEvents[i] = {
                    header: `0x5a`,
                    channel: channel,
                    module: module,
                    tofInNanoseconds: tof,
                    left: left,
                    right: right
                }
            } else if (chunk[8 * i] === 0x5b) {
                channelEvents[i] = {
                    header: `0x5b`,
                    channel: Number.NaN,
                    module: Number.NaN,
                    tofInNanoseconds: Number.NaN,
                    left: Number.NaN,
                    right: Number.NaN
                }
            } else if (chunk[8 * i] === 0x5c) {
                channelEvents[i] = {
                    header: `0x5c`,
                    channel: Number.NaN,
                    module: Number.NaN,
                    tofInNanoseconds: Number.NaN,
                    left: Number.NaN,
                    right: Number.NaN
                }
            } else {
                // unexpected
            }
        }
        res.send([
            '<thead>',
            '<tr>',
            Object.keys(channelEvents[0]).map(key => `<th>${key}</th>`).join(''),
            '</tr>',
            '</thead>',
            '<tbody align="right">',
            channelEvents.map(obj => ['<tr>',
                Object.keys(obj).map(key => {
                    /** @type {any} */
                    const tmp = obj
                    return `<td>${tmp[key].toLocaleString()}</td>`
                }).join(''),
                '</tr>'].join('')
            ).join(''),
            '</tbody>'
        ].join(''))
        return
    }
    if (req.query.header === '0x5b') {
        const timerEvents = new Array(25)
        for (let i = 0; i < chunk.length / 8; ++i) {
            if (chunk[8 * i] === 0x5a) {
                timerEvents[i] = {
                    header: `0x5a`,
                    crate: Number.NaN,
                    module: Number.NaN,
                    kickerId: Number.NaN
                }
            } else if (chunk[8 * i] === 0x5b) {
                const
                    byte1 = chunk[8 * i + 1],
                    byte2 = chunk[8 * i + 2],
                    byte3 = chunk[8 * i + 3],
                    byte4 = chunk[8 * i + 4],
                    byte5 = chunk[8 * i + 5],
                    byte6 = chunk[8 * i + 6],
                    byte7 = chunk[8 * i + 7],
                    kickerId = (byte3 << 32) + (byte4 << 24) + (byte5 << 16) + (byte6 << 8) + byte7
                timerEvents[i] = {
                    header: `0x5b`,
                    crate: byte1,
                    module: byte2,
                    kickerId: kickerId
                }
            } else if (chunk[8 * i] === 0x5c) {
                timerEvents[i] = {
                    header: `0x5c`,
                    crate: Number.NaN,
                    module: Number.NaN,
                    kickerId: Number.NaN
                }
            } else {
                // unexpected
            }
        }

        res.send([
            '<thead>',
            '<tr>',
            Object.keys(timerEvents[0]).map(key => `<th>${key}</th>`).join(''),
            '</tr>',
            '</thead>',
            '<tbody align="right">',
            timerEvents.map(obj => ['<tr>',
                Object.keys(obj).map(key => {
                    /** @type {any} */
                    const tmp = obj
                    return `<td>${tmp[key].toLocaleString()}</td>`
                }).join(''),
                '</tr>'].join('')
            ).join(''),
            '</tbody>'
        ].join(''))
    }
    if (req.query.header === '0x5c') {
        const timerEvents = new Array(25)
        for (let i = 0; i < chunk.length / 8; ++i) {
            if (chunk[8 * i] === 0x5a) {
                timerEvents[i] = {
                    header: `0x5a`,
                    mlfTimeInSeconds: Number.NaN,
                    subsecond: Number.NaN,
                    microsecond: Number.NaN
                }
            } else if (chunk[8 * i] === 0x5b) {
                timerEvents[i] = {
                    header: `0x5b`,
                    mlfTimeInSeconds: Number.NaN,
                    subsecond: Number.NaN,
                    microsecond: Number.NaN
                }
            } else if (chunk[8 * i] === 0x5c) {
                const
                    byte1 = chunk[8 * i + 1],
                    byte2 = chunk[8 * i + 2],
                    byte3 = chunk[8 * i + 3],
                    byte4 = chunk[8 * i + 4],
                    byte5 = chunk[8 * i + 5],
                    byte6 = chunk[8 * i + 6],
                    byte7 = chunk[8 * i + 7],
                    mlfTime = (byte1 << 22) + (byte2 << 14) + (byte3 << 6) + (byte4 >> 2),
                    subsecond = ((byte4 & 0b11) << 13) + (byte5 << 5) + (byte6 >> 3),
                    microsecond = ((byte6 & 0b111) << 8) + byte7
                timerEvents[i] = {
                    header: `0x5c`,
                    mlfTimeInSeconds: mlfTime,
                    subsecond: subsecond,
                    microsecond: microsecond
                }
            } else {
                // unexpected
            }
        }

        res.send([
            '<thead>',
            '<tr>',
            Object.keys(timerEvents[0]).map(key => `<th>${key}</th>`).join(''),
            '</tr>',
            '</thead>',
            '<tbody align="right">',
            timerEvents.map(obj => ['<tr>',
                Object.keys(obj).map(key => {
                    /** @type {any} */
                    const tmp = obj
                    return `<td>${tmp[key].toLocaleString()}</td>`
                }).join(''),
                '</tr>'].join('')
            ).join(''),
            '</tbody>'
        ].join(''))
    }
    if (req.query.header === '0x5a:pair') {
        const pariedlEvents = []
        let channel0
        let channel1

        for (let i = 0; i < chunk.length / 8; ++i) {
            if (chunk[8 * i] === 0x5a) {
                const
                    byte1 = chunk[8 * i + 1],
                    byte2 = chunk[8 * i + 2],
                    byte3 = chunk[8 * i + 3],
                    byte4 = chunk[8 * i + 4],
                    byte5 = chunk[8 * i + 5],
                    byte6 = chunk[8 * i + 6],
                    byte7 = chunk[8 * i + 7],
                    tof = ((byte1 << 16) + (byte2 << 8) + byte3) * 25, /** time bin is 25 nsec */
                    channel = byte4 & 0b111,
                    // module = byte4 >> 3,
                    left = (byte5 << 4) + (byte6 >> 4),
                    right = ((byte6 & 0b1111) << 8) + byte7

                if (channel === 0) channel0 = {
                    tofInNanoseconds: tof,
                    left: left,
                    right: right
                }
                if (channel === 1) channel1 = {
                    tofInNanoseconds: tof,
                    left: left,
                    right: right
                }
                if (channel0 && channel1) {
                    pariedlEvents.push({
                        tofInNanosecondsX: channel0.tofInNanoseconds,
                        leftX: channel0.left,
                        rightX: channel0.right,
                        tofInNanosecondsY: channel1.tofInNanoseconds,
                        leftY: channel1.left,
                        rightY: channel1.right
                    })
                }
            } else if (chunk[8 * i] === 0x5b) {
                // do nothing
            } else if (chunk[8 * i] === 0x5c) {
                // do nothing
            } else {
                // unexpected
            }
        }

        res.send([
            '<thead>',
            '<tr>',
            Object.keys(pariedlEvents[0]).map(key => `<th>${key}</th>`).join(''),
            '</tr>',
            '</thead>',
            '<tbody align="right">',
            pariedlEvents.map(obj => ['<tr>',
                Object.keys(obj).map(key => {
                    /** @type {any} */
                    const tmp = obj
                    return `<td>${tmp[key].toLocaleString()}</td>`
                }).join(''),
                '</tr>'].join('')
            ).join(''),
            '</tbody>'
        ].join(''))
    }
    if (req.query.header === '0x5a:neutron') {
        const neutronEvents = []
        let channel0
        let channel1

        for (let i = 0; i < chunk.length / 8; ++i) {
            if (chunk[8 * i] === 0x5a) {
                const
                    byte1 = chunk[8 * i + 1],
                    byte2 = chunk[8 * i + 2],
                    byte3 = chunk[8 * i + 3],
                    byte4 = chunk[8 * i + 4],
                    byte5 = chunk[8 * i + 5],
                    byte6 = chunk[8 * i + 6],
                    byte7 = chunk[8 * i + 7],
                    tof = ((byte1 << 16) + (byte2 << 8) + byte3) * 25, /** time bin is 25 nsec */
                    channel = byte4 & 0b111,
                    // module = byte4 >> 3,
                    left = (byte5 << 4) + (byte6 >> 4),
                    right = ((byte6 & 0b1111) << 8) + byte7

                if (channel === 0) channel0 = {
                    tofInNanoseconds: tof,
                    left: left,
                    right: right
                }
                if (channel === 1) channel1 = {
                    tofInNanoseconds: tof,
                    left: left,
                    right: right
                }
                if (channel0 && channel1) {
                    const dt = channel0.tofInNanoseconds - channel1.tofInNanoseconds

                    if (isbetween(dt, [-250, 250]))
                        neutronEvents.push({
                            tofInNanoseconds: (channel0.tofInNanoseconds + channel1.tofInNanoseconds) >> 1,
                            xInMillimeters: 50 * channel0.left / (channel0.left + channel0.right),
                            yInMillimeters: 50 * channel1.left / (channel1.left + channel1.right),
                        })
                }
            } else if (chunk[8 * i] === 0x5b) {
                // do nothing
            } else if (chunk[8 * i] === 0x5c) {
                // do nothing
            } else {
                // unexpected
            }
        }

        res.send([
            '<thead>',
            '<tr>',
            Object.keys(neutronEvents[0]).map(key => `<th>${key}</th>`).join(''),
            '</tr>',
            '</thead>',
            '<tbody align="right">',
            neutronEvents.map(obj => ['<tr>',
                Object.keys(obj).map(key => {
                    /** @type {any} */
                    const tmp = obj
                    return `<td>${tmp[key].toLocaleString()}</td>`
                }).join(''),
                '</tr>'].join('')
            ).join(''),
            '</tbody>'
        ].join(''))
    }
})

export default router;